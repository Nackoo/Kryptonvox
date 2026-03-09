function initializeAutoTranslateScript() {
	function injectScript(code) {
		const script = document.createElement('script');
		script.textContent = code;
		document.documentElement.appendChild(script);
		script.remove();
	}

	const scriptContent = `
        (function translationScript() {
            if (localStorage.getItem('scriptEnabled') !== 'true') return;

            const languageNames = {
                "ja": "japanese", "ko": "korean", "zh-CN": "chinese (simplified)", "zh-TW": "chinese (traditional)",
                "fr": "french", "de": "german", "es": "spanish", "ru": "russian", "ar": "arabic",
                "it": "italian", "pt": "portuguese", "nl": "dutch", "tr": "turkish", "pl": "polish",
                "id": "indonesian", "th": "thai", "vi": "vietnamese", "hi": "hindi", "sv": "swedish", "tl": "tagalog"
            };

            const targetSelector = '.sc-wkwDy > span:last-child'; 
            let observer = new MutationObserver(mutations => {
                if (localStorage.getItem('scriptEnabled') !== 'true') {
                    observer.disconnect();
                    return;
                }

                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            let targetNode = node.querySelector(targetSelector) || (node.matches(targetSelector) ? node : null);
                            if (targetNode) {
                                translateTextNodes(targetNode);
                            }
                        }
                    });
                });
            });

            function removeAllTranslations() {
                document.querySelectorAll('[data-translated="true"]').forEach(el => {
                    el.innerText = el.dataset.originalText || el.innerText;
                    el.removeAttribute('data-translated');
                });
            }

            function translateTextNodes(element) {
                if (localStorage.getItem('scriptEnabled') !== 'true') return;

                let computedColor = window.getComputedStyle(element).color;
                
                if (computedColor !== 'rgb(255, 255, 255)') return;

                let walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
                let nodesToTranslate = [];

                while (walker.nextNode()) {
                    let node = walker.currentNode;
                    let text = node.nodeValue.trim();
                    
                    if (text && !node.parentNode.dataset.translated) {
                        nodesToTranslate.push({ node, text });
                    }
                }

                if (nodesToTranslate.length > 0) {
                    nodesToTranslate.forEach(({ node, text }) => {
                        detectAndTranslate(text).then(result => {
                            if (result && result.translatedText) {
                                let translatedText = result.translatedText;
                                let detectedLang = languageNames[result.language] || "<span style='color:#e67e22'>unknown</span>";
                                let parent = node.parentNode;

                                if (!parent.innerHTML.includes(translatedText)) {
                                    parent.dataset.originalText = text;
                                    parent.innerHTML = \`\${translatedText} <span style="color:#B0B0B0;">(\${detectedLang})</span>
                                        <span class="view-original" style="color:#87CEFA; text-decoration:underline; cursor:pointer; font-size:0.9em; margin-left:0px;">view original</span>
                                    \`;
                                    parent.dataset.translated = "true";

                                    let viewOriginal = parent.querySelector('.view-original');
                                    viewOriginal.addEventListener('click', () => toggleOriginalText(parent, detectedLang));
                                }
                            }
                        });
                    });
                }
            }

            function toggleOriginalText(element, detectedLang) {
                let isTranslated = element.dataset.translated === "true";
                if (isTranslated) {
                    element.innerHTML = element.dataset.originalText + 
                        ' <span class="translate-back" style="color:#87CEFA; text-decoration:underline; cursor:pointer; font-size:0.9em; margin-left:0px;">translate</span>';
                    element.dataset.translated = "false";

                    let translateBack = element.querySelector('.translate-back');
                    translateBack.addEventListener('click', () => {
                        detectAndTranslate(element.dataset.originalText).then(result => {
                            if (result && result.translatedText) {
                                let translatedText = result.translatedText;
                                element.innerHTML = \`\${translatedText} <span style="color:#B0B0B0;">(\${detectedLang})</span>
                                    <span class="view-original" style="color:#87CEFA; text-decoration:underline; cursor:pointer; font-size:0.9em; margin-left:0px;">view original</span>\`;
                                element.dataset.translated = "true";

                                let viewOriginal = element.querySelector('.view-original');
                                viewOriginal.addEventListener('click', () => toggleOriginalText(element, detectedLang));
                            }
                        });
                    });
                }
            }

			async function detectAndTranslate(text) {
				const targetLang = localStorage.getItem("languagePreference") || "en";

				let url =
					'https://translate.googleapis.com/translate_a/single?client=gtx' +
					'&sl=auto' +
					'&tl=' + targetLang +
					'&dt=t&q=' + encodeURIComponent(text);

				try {
					let response = await fetch(url);
					let data = await response.json();

					let translatedText = data[0].map(item => item[0]).join('');
					let detectedLang = data[2] || 'Unknown';

					return { translatedText, language: detectedLang };
				} catch (error) {
					console.error('Translation failed:', error);
					return null;
				}
			}

            let config = { childList: true, subtree: true };
            observer.observe(document.body, config);
            document.querySelectorAll(targetSelector).forEach(el => translateTextNodes(el));

            if (localStorage.getItem('scriptEnabled') !== 'true') {
                observer.disconnect();
                removeAllTranslations();
            }
        })();

    `;

	injectScript(scriptContent);
}

const trWrapper = document.createElement('div');
trWrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 6px;
	margin-bottom: 1px;
`;

const translationOptionsContainer = document.createElement('div');

const trCheckbox = document.createElement('input');
trCheckbox.type = 'checkbox';
trCheckbox.id = 'scriptToggle';
trCheckbox.checked = getStoredBool('scriptEnabled');

const trLabel = document.createElement('span');
trLabel.htmlFor = 'scriptToggle';
trLabel.textContent = 'enable auto-translate';
trLabel.style.cssText = `
	font-size: 14px;
	margin-left: 10px;
`;

function toggleScript() {
	if (confirm('reload?')) {
		setStoredBool('scriptEnabled', trCheckbox.checked);
		location.reload();
	} else {
		trCheckbox.checked = !trCheckbox.checked;
	}
}

if (trCheckbox.checked) {
	initializeAutoTranslateScript();
	translationOptionsContainer.style.display = 'inline';
} else {
	translationOptionsContainer.style.display = 'none';
}

trCheckbox.addEventListener('change', toggleScript);

const hrr10 = document.createElement('hr');
hrr10.style.cssText = `
	border: 1px solid grey;
	margin-top: 9px;
	margin-bottom: 4px;
`;
container.appendChild(hrr10);

trWrapper.appendChild(trCheckbox);
trWrapper.appendChild(trLabel);
container.appendChild(trWrapper);

let isCountdownEnabled = false;