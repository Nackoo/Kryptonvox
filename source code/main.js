const originalSkinURL1 = 'https://voxiom.io/package/cb1d14c1ff0efb6a282b.png';
const originalSkinURL2 = 'https://voxiom.io/package/aef55bdd0c3c3c3734f8.png';
const originalSkinURL3 = 'https://voxiom.io/package/ecca1227c2e0406be225.png';

const defaultColors = {
	default: {
		head: '#24b44d',
		body: '#ee1c23',
	},
	ruby: {
		head: '#ffffff',
		body: '#ee1c23',
	},
	sapphire: {
		head: '#ffffff',
		body: '#1919ff',
	},
};

const savedColors = {
	default: {
		head:
			localStorage.getItem('defaultHeadColor') || defaultColors.default.head,
		body:
			localStorage.getItem('defaultBodyColor') || defaultColors.default.body,
	},
	ruby: {
		head: localStorage.getItem('rubyHeadColor') || defaultColors.ruby.head,
		body: localStorage.getItem('rubyBodyColor') || defaultColors.ruby.body,
	},
	sapphire: {
		head:
			localStorage.getItem('sapphireHeadColor') || defaultColors.sapphire.head,
		body:
			localStorage.getItem('sapphireBodyColor') || defaultColors.sapphire.body,
	},
};

document.title = "voxiom.io";

const container = document.createElement('div');
container.style.position = 'absolute';
container.style.top = '10px';
container.style.right = '10px';
container.style.padding = '10px';
container.style.backgroundColor = '#141414';
container.style.display =
	localStorage.getItem('isContainerHidden') === 'true' ? 'none' : 'flex';
container.style.flexDirection = 'column';
container.style.overflow = 'auto';
container.style.maxHeight = '555px';
container.style.border = '1px solid #555555';
container.style.fontFamily = 'cursive';

container.style.scrollbarWidth = 'thin';
container.style.scrollbarColor = '#888888 #333333';

const style = document.createElement('style');
style.innerHTML = `div::-webkit-scrollbar{width: 1px;height:1px;}div::-webkit-scrollbar-thumb{background-color: #888888;border-radius: 10px;}div::-webkit-scrollbar-track{background-color: #333333;}`;
document.head.appendChild(style);

const hideText = document.createElement('span');
hideText.style.marginBottom = '7px';
hideText.style.fontSize = '14px';
container.appendChild(hideText);

function createColorPicker(savedColor, storageKey) {
	const colorPicker = document.createElement('input');
	colorPicker.type = 'color';
	colorPicker.value = savedColor;
	colorPicker.style.height = '22px';
	colorPicker.style.width = '30px';

	colorPicker.addEventListener('input', function () {
		const selectedColor = colorPicker.value;
		localStorage.setItem(storageKey, selectedColor);
	});

	return colorPicker;
}

const hr = document.createElement('hr');
hr.style.marginBottom = '7px';
hr.style.border = '1px solid gray';
container.appendChild(hr);

const info = document.createElement('span');
info.textContent = 'head - body color';
info.style.fontSize = '14px';
info.style.marginBottom = '9px';
info.style.marginTop = '3px';
container.appendChild(info);

const ver = document.createElement('div');
ver.innerHTML = 'krypton';
ver.title = "version 20 march 2025"
ver.style.fontSize = '14px';
ver.style.position = 'absolute';
ver.style.right = '8px';
ver.style.top = '10px';
container.appendChild(ver);

['default', 'ruby', 'sapphire'].forEach((skin) => {
	const skinWrapper = document.createElement('div');
	skinWrapper.style.display = 'flex';
	skinWrapper.style.alignItems = 'center';
	skinWrapper.style.marginBottom = '3px';

	const headPicker = createColorPicker(
		savedColors[skin].head,
		`${skin}HeadColor`
	);
	const bodyPicker = createColorPicker(
		savedColors[skin].body,
		`${skin}BodyColor`
	);

	bodyPicker.style.marginLeft = '3px';
	bodyPicker.style.border = 'none';
	headPicker.style.border = 'none';
	bodyPicker.style.width = '40px';
	headPicker.style.width = '40px';

	const label = document.createElement('span');
	label.textContent = `${skin[0]}${skin.slice(1)} skin`;
	label.style.marginLeft = '7px';
	label.style.fontSize = '14px';
	label.style.color = 'white';

	skinWrapper.appendChild(headPicker);
	skinWrapper.appendChild(bodyPicker);
	skinWrapper.appendChild(label);

	container.appendChild(skinWrapper);
});

const checkboxWrapper = document.createElement('div');
checkboxWrapper.style.display = 'flex';
checkboxWrapper.style.alignItems = 'center';
checkboxWrapper.style.marginTop = '7px';

const defaultSkinCheckbox = document.createElement('input');
defaultSkinCheckbox.type = 'checkbox';
defaultSkinCheckbox.checked = localStorage.getItem('useDefaultSkin') === 'true';
defaultSkinCheckbox.style.marginRight = '10px';

const checkboxLabel = document.createElement('span');
checkboxLabel.textContent = 'skin swapper';
checkboxLabel.style.fontSize = '14px';
checkboxLabel.style.color = 'white';

checkboxWrapper.appendChild(defaultSkinCheckbox);
checkboxWrapper.appendChild(checkboxLabel);
container.appendChild(checkboxWrapper);

defaultSkinCheckbox.addEventListener('change', function () {
	const isChecked = defaultSkinCheckbox.checked;
	localStorage.setItem('useDefaultSkin', isChecked ? 'true' : 'false');
});

const hrr = document.createElement('hr');
hrr.style.border = '1px solid gray';
hrr.style.marginTop = '8px';
hrr.style.marginBottom = '5px';
container.appendChild(hrr);

document.addEventListener('DOMContentLoaded', () => {
	localStorage.setItem('useFocusMode', 'false');
	focusModeCheckbox.checked = false;
	toggleFocusMode(false);
});

const focusModeWrapper = document.createElement('div');
focusModeWrapper.style.display = 'flex';
focusModeWrapper.style.alignItems = 'center';

const focusModeCheckbox = document.createElement('input');
focusModeCheckbox.type = 'checkbox';
focusModeCheckbox.checked = false;
focusModeCheckbox.style.marginRight = '10px';
focusModeCheckbox.style.marginTop = '3px';

const focusModeLabel = document.createElement('span');
focusModeLabel.style.fontSize = '14px';
focusModeLabel.style.marginTop = '3px';

focusModeWrapper.appendChild(focusModeCheckbox);
focusModeWrapper.appendChild(focusModeLabel);
container.appendChild(focusModeWrapper);

const hrr1 = document.createElement('hr');
hrr1.style.border = '1px solid gray';
hrr1.style.marginTop = '8px';
container.appendChild(hrr1);

function toggleFocusMode(isChecked) {
	localStorage.setItem('useFocusMode', isChecked ? 'true' : 'false');

	const elementsToModify = document.querySelectorAll(
		'.cxSTIe, .ekCLHU, .eFhDSk, .lpfJAq *, .lpdfTz *, .sc-kqnjJL'
	);

	elementsToModify.forEach((element) => {
		element.style.setProperty(
			'visibility',
			isChecked ? 'hidden' : '',
			'important'
		);
	});

	const scKqnjJL = document.querySelectorAll('.sc-kqnjJL');
	scKqnjJL.forEach((element) => {
		element.style.marginLeft = isChecked ? '-35px' : '';
	});
}

focusModeCheckbox.addEventListener('change', function () {
	toggleFocusMode(focusModeCheckbox.checked);
});

function updateCrosshair() {
	const isEnabled = localStorage.getItem('crosshairEnabled') === 'true';
	const crosshairUrl = localStorage.getItem('crosshairUrl') || '';
	const crosshairSize = localStorage.getItem('crosshairSize') || '50px';

	let crosshair = document.getElementById('custom-crosshair');
	if (!crosshair) {
		crosshair = document.createElement('div');
		crosshair.id = 'custom-crosshair';
		crosshair.style.position = 'fixed';
		crosshair.style.top = '50%';
		crosshair.style.left = '50%';
		crosshair.style.transform = 'translate(-50%, -50%)';
		crosshair.style.pointerEvents = 'none';
		document
			.getElementById('app')
			.insertAdjacentElement('afterbegin', crosshair);
	}

	if (isEnabled && crosshairUrl) {
		crosshair.style.width = crosshairSize;
		crosshair.style.height = crosshairSize;
		crosshair.style.backgroundImage = `url(${crosshairUrl})`;
		crosshair.style.backgroundSize = 'contain';
		crosshair.style.backgroundRepeat = 'no-repeat';
		crosshair.style.display = 'block';
	} else {
		crosshair.style.display = 'none';
	}
}

const crosshairWrapper = document.createElement('div');
crosshairWrapper.style.display = 'flex';
crosshairWrapper.style.flexDirection = 'column';
crosshairWrapper.style.marginTop = '10px';
crosshairWrapper.style.alignItems = 'flex-start';

const enableCheckboxWrapper = document.createElement('div');
enableCheckboxWrapper.style.display = 'flex';
enableCheckboxWrapper.style.alignItems = 'center';
enableCheckboxWrapper.style.marginBottom = '5px';

const enableCheckbox = document.createElement('input');
enableCheckbox.type = 'checkbox';
enableCheckbox.style.marginRight = '5px';
enableCheckbox.id = 'enable-crosshair';
enableCheckboxWrapper.appendChild(enableCheckbox);

const enableLabel = document.createElement('label');
enableLabel.textContent = 'enable crosshair';
enableLabel.style.marginLeft = '5px';
enableLabel.style.fontSize = '14px';
enableLabel.htmlFor = 'enable-crosshair';
enableCheckboxWrapper.appendChild(enableLabel);
crosshairWrapper.appendChild(enableCheckboxWrapper);

const chwrapwrap = document.createElement('div');
chwrapwrap.style.display = 'flex';
chwrapwrap.style.alignItems = 'center';
chwrapwrap.style.marginTop = '3px';
crosshairWrapper.appendChild(chwrapwrap);

const chLabel = document.createElement('span');
chLabel.textContent = 'upload ch:';
chLabel.style.marginRight = '5px';
chLabel.style.fontSize = '14px';
chwrapwrap.appendChild(chLabel);

const crosshairUrlInput = document.createElement('input');
crosshairUrlInput.type = 'text';
crosshairUrlInput.placeholder = 'Enter URL';
crosshairUrlInput.style.marginTop = '2px';
crosshairUrlInput.style.width = '109px';
crosshairUrlInput.style.marginRight = '9px';
crosshairUrlInput.style.border = 'none';
crosshairUrlInput.style.color = 'white';
crosshairUrlInput.style.background = '#3c3c3c';
crosshairUrlInput.style.padding = '2px';
crosshairUrlInput.style.paddingLeft = '4px';
crosshairUrlInput.style.paddingRight = '4px';
chwrapwrap.appendChild(crosshairUrlInput);

const sfileInput = document.createElement('input');
sfileInput.type = 'file';
sfileInput.accept = 'image/*';
sfileInput.style.marginTop = '2px';
sfileInput.style.width = '85px';
chwrapwrap.appendChild(sfileInput);

const sizeSliderWrapper = document.createElement('div');
sizeSliderWrapper.style.display = 'flex';
sizeSliderWrapper.style.alignItems = 'center';
sizeSliderWrapper.style.marginTop = '11px';

const sizeLabel = document.createElement('span');
sizeLabel.textContent = 'size:';
sizeLabel.style.fontSize = '14px';
sizeLabel.style.marginTop = '-4px';
sizeSliderWrapper.appendChild(sizeLabel);

const sizeSlider = document.createElement('input');
sizeSlider.type = 'range';
sizeSlider.min = '1';
sizeSlider.max = '200';
sizeSlider.step = '1';
sizeSlider.value = '100';
sizeSlider.style.marginLeft = '5px';
sizeSlider.style.width = '195px';
sizeSliderWrapper.appendChild(sizeSlider);

const sizeValueDisplay = document.createElement('span');
sizeValueDisplay.textContent = `${sizeSlider.value}px`;
sizeValueDisplay.style.fontSize = '14px';
sizeValueDisplay.style.marginLeft = '5px';
sizeSliderWrapper.appendChild(sizeValueDisplay);

crosshairWrapper.appendChild(sizeSliderWrapper);
container.appendChild(crosshairWrapper);

const updateSettings = () => {
	const crosshairUrl = crosshairUrlInput.value.trim();
	const crosshairSize = sizeSlider.value + 'px';

	sizeValueDisplay.textContent = `${sizeSlider.value}px`;

	localStorage.setItem('crosshairSize', crosshairSize);
	localStorage.setItem('crosshairEnabled', enableCheckbox.checked);
	if (crosshairUrl) {
		localStorage.setItem('crosshairUrl', crosshairUrl);
	}
	updateCrosshair();
};

enableCheckbox.addEventListener('change', () => {
	updateSettings();
});

crosshairUrlInput.addEventListener('input', () => {
	updateSettings();
});

sizeSlider.addEventListener('input', () => {
	updateSettings();
});

sfileInput.addEventListener('change', (event) => {
	if (event.target.files && event.target.files[0]) {
		const reader = new FileReader();
		reader.onload = function (e) {
			crosshairUrlInput.value = e.target.result;
			localStorage.setItem('crosshairUrl', e.target.result);
			updateSettings();
		};
		reader.readAsDataURL(event.target.files[0]);
	}
});

window.addEventListener('load', () => {
	enableCheckbox.checked = localStorage.getItem('crosshairEnabled') === 'true';
	crosshairUrlInput.value = localStorage.getItem('crosshairUrl') || '';
	sizeSlider.value = parseInt(localStorage.getItem('crosshairSize')) || 100;
	sizeValueDisplay.textContent = `${sizeSlider.value}px`;

	updateCrosshair();
});

function mainFunction() {
	function injectScript(code) {
		let script = document.createElement('script');
		script.textContent = code;
		document.documentElement.appendChild(script);
		script.remove();
	}

	let scriptContent = `
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
                                let detectedLang = languageNames[result.language] || "Unknown";
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
                let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + encodeURIComponent(text);
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
        
        function checkForUntranslatedMessages() {
            document.querySelectorAll(targetSelector).forEach(el => {
                if (!el.dataset.translated) {
                    translateTextNodes(el);
                }
            });
        }

        setInterval(checkForUntranslatedMessages, 1000);
    `;

	injectScript(scriptContent);
}

const trwrapper = document.createElement('div');
trwrapper.style.display = 'flex';
trwrapper.style.alignItems = 'center';
trwrapper.style.marginTop = "6px";
trwrapper.style.marginBottom = "1px";

let trcheckbox = document.createElement('input');
trcheckbox.type = 'checkbox';
trcheckbox.id = 'scriptToggle';
trcheckbox.checked = localStorage.getItem('scriptEnabled') === 'true';

let trlabel = document.createElement('span');
trlabel.htmlFor = 'scriptToggle';
trlabel.textContent = 'enable auto-translate';
trlabel.style.fontSize = "14px";
trlabel.style.marginLeft = "7px";

function toggleScript(event) {
    if (confirm("reload?")) {
        let enabled = trcheckbox.checked;
        localStorage.setItem('scriptEnabled', enabled);
        location.reload();
    } else {
        trcheckbox.checked = !trcheckbox.checked; 
    }
}

if (trcheckbox.checked) {
	mainFunction();
}

trcheckbox.addEventListener('change', toggleScript);

	const hrr10 = document.createElement('hr');
	hrr10.style.border = '1px solid gray';
	hrr10.style.marginTop = '9px';
	hrr10.style.marginBottom = '4px';
	container.appendChild(hrr10);

	trwrapper.appendChild(trcheckbox);
	trwrapper.appendChild(trlabel);
	container.appendChild(trwrapper);

const resetEverythingButton = document.createElement('button');
resetEverythingButton.textContent = 'restore defaults';
resetEverythingButton.style.padding = '3px';
resetEverythingButton.style.cursor = 'pointer';
resetEverythingButton.style.background = "none";
resetEverythingButton.style.transition = 'background 0.1s ease';
resetEverythingButton.addEventListener('mouseover', () => {
    resetEverythingButton.style.background = '#b10000';
});
resetEverythingButton.addEventListener('mouseout', () => {
    resetEverythingButton.style.background = 'none';
});
resetEverythingButton.style.border = '1px solid white';
resetEverythingButton.style.color = 'white';
resetEverythingButton.style.fontSize = '12px';
resetEverythingButton.title = 'resets everything into default';

const defaultKeybinds = {
	focusKeybind: {
		key: 'k',
		modifier: 'alt',
	},
	containerKeybind: {
		key: 'z',
		modifier: 'alt',
	},
};

resetEverythingButton.addEventListener('click', function () {
	const confirmation = confirm(
		'This action cannot be undone. Are you sure you want to reset everything?'
	);
	if (confirmation) {
		localStorage.removeItem('crosshairEnabled');
		localStorage.removeItem('crosshairUrl');
		localStorage.removeItem('crosshairSize');
		
		trcheckbox.checked = false;
		localStorage.setItem("scriptEnabled", "false");

		enableCheckbox.checked = false;
		crosshairUrlInput.value = '';
		sizeSlider.value = 100;
		sizeValueDisplay.textContent = '100px';
		updateCrosshair();

		Object.keys(defaultColors).forEach((skin) => {
			localStorage.setItem(`${skin}HeadColor`, defaultColors[skin].head);
			localStorage.setItem(`${skin}BodyColor`, defaultColors[skin].body);
		});

		const customStyleTag = document.querySelector('style[data-custom="true"]');
		if (customStyleTag) customStyleTag.remove();

		const cssCheckbox = document.querySelector('input[type="checkbox"]');
		if (
			cssCheckbox &&
			cssCheckbox.nextSibling?.textContent.includes('Enable Custom CSS')
		) {
			cssCheckbox.checked = false;
			localStorage.setItem('cssCheckbox', 'false');
		}

		const textarea = document.querySelector('textarea');
		if (textarea) {
			textarea.value = '';
			localStorage.removeItem('customCSS');
		}

		const applyCSS = () => {
			const existingLink = document.querySelector('link[data-css]');
			if (existingLink) {
				existingLink.remove();
			}
 
      const defaultCSS = 'https://kryptonvox.netlify.app/main.css';
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = defaultCSS;
			link.dataset.css = 'true';
			document.head.appendChild(link);
		};
		applyCSS();

		localStorage.setItem('useFocusMode', 'false');
		toggleFocusMode(false);

		localStorage.setItem('useDefaultSkin', 'false');
		defaultSkinCheckbox.checked = false;

		focusKeybind = {
			...defaultKeybinds.focusKeybind,
		};
		containerKeybind = {
			...defaultKeybinds.containerKeybind,
		};

		saveKeybinds();

		xhxcheckbox.checked = false;
		localStorage.setItem('uiHintDisabled', 'false');

		updateUIHintVisibility();

		location.reload();
	}
});

let focusKeybind = {
	key: 'k',
	modifier: 'alt',
};
let containerKeybind = {
	key: 'z',
	modifier: 'alt',
};

function saveKeybinds() {
	localStorage.setItem('focusKeybind', JSON.stringify(focusKeybind));
	localStorage.setItem('containerKeybind', JSON.stringify(containerKeybind));
}

function loadKeybinds() {
	const savedFocusKeybind = JSON.parse(localStorage.getItem('focusKeybind'));
	const savedContainerKeybind = JSON.parse(
		localStorage.getItem('containerKeybind')
	);

	if (savedFocusKeybind) focusKeybind = savedFocusKeybind;
	if (savedContainerKeybind) containerKeybind = savedContainerKeybind;
}

const xhxwrapper = document.createElement('div');
xhxwrapper.style.display = 'flex';
xhxwrapper.style.alignItems = 'center';
xhxwrapper.style.marginTop = '6px';
xhxwrapper.style.marginBottom = '7px';

const xhxcheckbox = document.createElement('input');
xhxcheckbox.type = 'checkbox';

const xhxlabel = document.createElement('span');
xhxlabel.textContent = 'disable opening UI hint';
xhxlabel.style.fontSize = '14px';
xhxlabel.style.marginLeft = '7px';

const uiHintSpan = document.createElement('span');
uiHintSpan.style.position = 'fixed';
uiHintSpan.style.bottom = '0';
uiHintSpan.style.right = '0';
uiHintSpan.style.fontSize = '9px';
uiHintSpan.style.color = 'white';
uiHintSpan.style.zIndex = '9998';

function updateuilabel() {
	const containerKeybind = JSON.parse(
		localStorage.getItem('containerKeybind') || '{}'
	);
	const key = containerKeybind.key || 'z';
	const modifier = containerKeybind.modifier || 'alt';
	uiHintSpan.textContent = `${modifier} + ${key.toUpperCase()} to open UI`;
}

function updateUIHintVisibility() {
	if (xhxcheckbox.checked) {
		uiHintSpan.style.display = 'none';
		localStorage.setItem('uiHintDisabled', 'true');
	} else {
		uiHintSpan.style.display = 'flex';
		localStorage.setItem('uiHintDisabled', 'false');
	}
}

function initializeState() {
	const isHintDisabled = localStorage.getItem('uiHintDisabled') === 'true';
	xhxcheckbox.checked = isHintDisabled;
	updateUIHintVisibility();
}

const appElement = document.getElementById('app');
if (appElement) {
	appElement.insertAdjacentElement('afterbegin', uiHintSpan);
	uiHintSpan.style.display = 'none';
}

updateuilabel();
xhxcheckbox.addEventListener('change', updateUIHintVisibility);
initializeState();

function updateLabels() {
	focusModeLabel.textContent = `focus mode (${focusKeybind.modifier} + ${focusKeybind.key.toUpperCase()})`;
	hideText.textContent = `${containerKeybind.modifier} + ${containerKeybind.key.toUpperCase()} to hide/show`;
}

function createKeybindButton(initialValue, onKeySet) {
	const button = document.createElement('button');
	button.innerText = initialValue;
	button.type = 'button';

	button.style.background = 'none';
	button.style.border = 'none';
	button.style.border = '1px solid white';
	button.style.borderRadius = '50px';
	button.style.width = '77px';
	button.style.color = 'white';

	button.addEventListener('click', () => {
		button.innerText = 'press a key';
		button.style.background = '#bf0000';
		const handleKeyPress = (event) => {
			event.preventDefault();
			button.style.background = 'none';
			const key = event.key.toLowerCase();
			button.innerText = key;
			onKeySet(key);
			saveKeybinds();
			updateLabels();
			updateuilabel();
			document.removeEventListener('keydown', handleKeyPress);
		};
		document.addEventListener('keydown', handleKeyPress);
	});

	return button;
}

function updateEventListeners() {
	document.removeEventListener('keydown', focusKeyHandler);
	document.removeEventListener('keydown', containerKeyHandler);

	document.addEventListener('keydown', focusKeyHandler);
	document.addEventListener('keydown', containerKeyHandler);
}

function focusKeyHandler(event) {
	const modifierCheck =
		focusKeybind.modifier === 'alt'
			? event.altKey
			: focusKeybind.modifier === 'shift'
				? event.shiftKey
				: focusKeybind.modifier === 'ctrl'
					? event.ctrlKey
					: true;

	if (event.key.toLowerCase() === focusKeybind.key && modifierCheck) {
		const isChecked = !focusModeCheckbox.checked;
		focusModeCheckbox.checked = isChecked;
		focusModeCheckbox.dispatchEvent(new Event('change'));
	}
}

function containerKeyHandler(event) {
	const modifierCheck =
		containerKeybind.modifier === 'alt'
			? event.altKey
			: containerKeybind.modifier === 'shift'
				? event.shiftKey
				: containerKeybind.modifier === 'ctrl'
					? event.ctrlKey
					: true;

	if (event.key.toLowerCase() === containerKeybind.key && modifierCheck) {
		const isHidden = container.style.display === 'none';
		container.style.display = isHidden ? 'flex' : 'none';
		localStorage.setItem('isContainerHidden', isHidden ? 'false' : 'true');
	}
}

function createKeybindGroup(labelText, keybindObject, onUpdate) {
	const group = document.createElement('div');
	group.style.display = 'flex';
	group.style.alignItems = 'center';
	group.style.marginBottom = '7px';

	const label = document.createElement('label');
	label.innerText = `${labelText}: `;
	label.style.marginRight = '10px';
	label.style.fontSize = '13px';
	group.appendChild(label);

	const modifierButton = createKeybindButton(
		keybindObject.modifier,
		(newModifier) => {
			keybindObject.modifier = newModifier;
			onUpdate();
		}
	);
	modifierButton.style.marginRight = '5px';

	const plusText = document.createElement('span');
	plusText.innerText = '+';
	plusText.style.marginRight = '3px';
	plusText.style.marginLeft = '-1px';
	plusText.style.fontSize = '14px';

	const keyButton = createKeybindButton(keybindObject.key, (newKey) => {
		keybindObject.key = newKey;
		onUpdate();
	});

	keyButton.style.background = 'none';
	keyButton.style.width = '75px';

	group.appendChild(modifierButton);
	group.appendChild(plusText);
	group.appendChild(keyButton);

	return group;
}

function createKeybindForm() {
	const form = document.createElement('form');
	form.id = 'keybindForm';
	form.style.display = 'none';
	form.style.flexDirection = 'column';
	form.style.alignItems = 'flex-end';

	const dropdownWrapper = document.createElement('div');
	dropdownWrapper.style.display = 'flex';
	dropdownWrapper.style.alignItems = 'center';
	dropdownWrapper.style.marginTop = '7px';

	const dropdown = document.createElement('span');
	dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg> advanced`;
	dropdown.style.fontSize = '14px';
	dropdown.style.cursor = 'pointer';

	const dropdownHr = document.createElement('hr');
	dropdownHr.style.marginTop = '4px';
	dropdownHr.style.border = '1px solid gray';
	dropdownHr.style.marginLeft = '5px';
	dropdownHr.style.width = '191px';

	dropdownWrapper.appendChild(dropdown);
	dropdownWrapper.appendChild(dropdownHr);
	container.appendChild(dropdownWrapper);

	const keybindLabel = document.createElement('span');
	keybindLabel.style.fontSize = '14px';
	keybindLabel.textContent = 'custom keybinding:';
	keybindLabel.style.marginTop = '-8px';
	keybindLabel.style.marginBottom = '12px';
	form.appendChild(keybindLabel);

	const focusGroup = createKeybindGroup(
		'focus mode',
		focusKeybind,
		updateEventListeners
	);
	form.appendChild(focusGroup);

	const containerGroup = createKeybindGroup(
		'container',
		containerKeybind,
		updateEventListeners
	);
	form.appendChild(containerGroup);

	container.appendChild(form);

	const hrr6 = document.createElement('hr');
	hrr6.style.border = '1px solid gray';
	hrr6.style.marginTop = '9px';
	hrr6.style.marginBottom = '4px';
	container.appendChild(hrr6);

	xhxwrapper.appendChild(xhxcheckbox);
	xhxwrapper.appendChild(xhxlabel);
	container.appendChild(xhxwrapper);

	const cssGroup = document.createElement('div');
	cssGroup.style.display = 'flex';
	cssGroup.style.alignItems = 'center';
	cssGroup.style.marginTop = '3px';
	cssGroup.style.marginBottom = '4px';

	const cssDropdown = document.createElement('span');
	cssDropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg> custom css`;
	cssDropdown.style.fontSize = '14px';
	cssDropdown.style.cursor = 'pointer';

	const cssHr = document.createElement('hr');
	cssHr.style.marginTop = '5px';
	cssHr.style.border = '1px solid gray';
	cssHr.style.marginLeft = '5px';
	cssHr.style.width = '179px';

	cssGroup.appendChild(cssDropdown);
	cssGroup.appendChild(cssHr);
	container.appendChild(cssGroup);

	const cssContainer = document.createElement('div');
	cssContainer.style.position = 'absolute';
	cssContainer.style.top = '200px';
	cssContainer.style.right = '319px';
	cssContainer.style.padding = '10px';
	cssContainer.style.minWidth = '255px';
	cssContainer.style.background = '#141414';
	cssContainer.style.display = 'none';
	cssContainer.style.flexDirection = 'column';
	cssContainer.style.minHeight = '365px';
	cssContainer.style.border = '1px solid #555555';
	cssContainer.style.fontFamily = 'cursive';

	const cssWrapper = document.createElement('div');
	cssWrapper.style.display = 'flex';
	cssWrapper.style.alignItems = 'center';
	cssWrapper.style.marginTop = '10px';
	cssWrapper.style.marginBottom = "3px";

	const cssCheckbox = document.createElement('input');
	cssCheckbox.type = 'checkbox';
	cssCheckbox.style.marginRight = '10px';
	cssCheckbox.style.marginTop = '2px';

	const cssLabel = document.createElement('span');
	cssLabel.textContent = 'enable custom css';
	cssLabel.style.fontSize = '14px';

	const textarea = document.createElement('textarea');
	textarea.style.width = '255px';
	textarea.style.height = '283px';
	textarea.style.marginTop = '10px';
	textarea.style.setProperty('font-family', 'monospace', 'important');
	textarea.style.fontSize = '13px';
	textarea.style.backgroundColor = 'rgba(0,0,0,0.5)';
	textarea.style.color = '#ffffff';
	textarea.style.border = '1px solid #555555';
	textarea.style.padding = '10px';
	textarea.style.resize = 'none';
	textarea.placeholder = 'write css code here...';

	const textareaStyle = document.createElement('style');
	textareaStyle.innerHTML = `textarea::-webkit-scrollbar{width:2px;height:2px;}textarea::-webkit-scrollbar-thumb{background-color: #888888;border-radius: 10px;}textarea::-webkit-scrollbar-track{background-color: #333333;}`;
	document.head.appendChild(textareaStyle);

	cssWrapper.appendChild(cssCheckbox);
	cssWrapper.appendChild(cssLabel);
	cssContainer.appendChild(cssWrapper);
	cssContainer.appendChild(textarea);

	document.body.appendChild(cssContainer);

	let cssCheckboxState = localStorage.getItem('cssCheckbox') === 'true';
	cssCheckbox.checked = cssCheckboxState;

	function applyCSS() {
		const existingLink = document.querySelector('link[data-css]');
		if (existingLink) {
			existingLink.remove();
		}

		let cssFile = cssCheckbox.checked
			? ''
			: 'https://kryptonvox.netlify.app/main.css';
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = cssFile;
		link.dataset.css = 'true';
		document.head.appendChild(link);

		const customCSS = localStorage.getItem('customCSS');
		if (customCSS && cssCheckbox.checked) {
			const styleTag = document.createElement('style');
			styleTag.innerHTML = customCSS;
			styleTag.dataset.custom = 'true';
			document.head.appendChild(styleTag);
		} else {
			const existingCustomStyleTag = document.querySelector(
				'style[data-custom="true"]'
			);
			if (existingCustomStyleTag) {
				existingCustomStyleTag.remove();
			}
		}
	}
	applyCSS();

	cssCheckbox.addEventListener('change', () => {
		localStorage.setItem('cssCheckbox', cssCheckbox.checked);
		applyCSS();
		updateRealTimeCSS();
	});

	textarea.addEventListener('input', () => {
		const customCSS = textarea.value;
		localStorage.setItem('customCSS', customCSS);
		updateRealTimeCSS();
	});

	function updateRealTimeCSS() {
		const customCSS = localStorage.getItem('customCSS');
		let existingStyleTag = document.querySelector('style[data-custom="true"]');

		if (cssCheckbox.checked) {
			if (!existingStyleTag) {
				existingStyleTag = document.createElement('style');
				existingStyleTag.dataset.custom = 'true';
				document.head.appendChild(existingStyleTag);
			}
			existingStyleTag.innerHTML = customCSS;
		} else if (existingStyleTag) {
			existingStyleTag.remove();
		}
	}

	textarea.addEventListener('input', () => {
		const customCSS = textarea.value;
		localStorage.setItem('customCSS', customCSS);
		if (cssCheckbox.checked) {
			updateRealTimeCSS();
		}
	});

	cssDropdown.addEventListener('click', () => {
		if (cssContainer.style.display === 'none') {
			cssContainer.style.display = 'flex';
		} else {
			cssContainer.style.display = 'none';
		}
	});

	const savedCustomCSS = localStorage.getItem('customCSS');
	if (savedCustomCSS) {
		textarea.value = savedCustomCSS;
		updateRealTimeCSS();
	}

	function syncDisplay(sourceElement, targetElement) {
		return new MutationObserver(() => {
			const sourceDisplay = sourceElement.style.display;
			if (sourceDisplay === 'none') {
				targetElement.style.display = 'none';
			}
		});
	}

	const containerObserver = syncDisplay(container, cssContainer);
	containerObserver.observe(container, {
		attributes: true,
		attributeFilter: ['style'],
	});

	const formObserver = syncDisplay(form, cssContainer);
	formObserver.observe(form, {
		attributes: true,
		attributeFilter: ['style'],
	});

	function updateDropdownInnerHTML() {
		if (cssContainer.style.display === 'none') {
			cssDropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg> custom css`;
		} else {
			cssDropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/> </svg> custom css`;
		}
	}

	const cssContainerObserver = new MutationObserver(() => {
		updateDropdownInnerHTML();
	});
	cssContainerObserver.observe(cssContainer, {
		attributes: true,
		attributeFilter: ['style'],
	});

	updateDropdownInnerHTML();

	dropdown.addEventListener('click', () => {
		const isFormVisible = form.style.display === 'flex';

		form.style.display = isFormVisible ? 'none' : 'flex';

		if (form.style.display === 'flex') {
			cssGroup.style.display = 'flex';
			xhxwrapper.style.display = 'flex';
			hrr6.style.display = 'flex';
			dropdownWrapper.style.marginBottom = '12px';
			resetEverythingButton.style.marginTop = '8px';
			dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-4px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg> advanced`;
		} else {
			cssGroup.style.display = 'none';
			xhxwrapper.style.display = 'none';
			hrr6.style.display = 'none';
			dropdownWrapper.style.marginBottom = '0';
			resetEverythingButton.style.marginTop = '12px';
			dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg> advanced`;
		}

		localStorage.setItem(
			'keybindFormVisible',
			form.style.display === 'flex' ? 'true' : 'false'
		);
	});

	const isFormVisible = localStorage.getItem('keybindFormVisible') === 'true';
	if (isFormVisible) {
		form.style.display = 'flex';
		xhxwrapper.style.display = 'flex';
		hrr6.style.display = 'flex';
		cssGroup.style.display = 'flex';
		dropdownWrapper.style.marginBottom = '12px';
		resetEverythingButton.style.marginTop = '8px';
		dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-4px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg> advanced`;
	} else {
		form.style.display = 'none';
		xhxwrapper.style.display = 'none';
		hrr6.style.display = 'none';
		cssGroup.style.display = 'none';
		dropdownWrapper.style.marginBottom = '0';
		resetEverythingButton.style.marginTop = '12px';
	}
}

function init() {
	loadKeybinds();
	updateLabels();
	updateEventListeners();
	createKeybindForm();
}

init();

container.appendChild(resetEverythingButton);
document.body.appendChild(container);

if (window.WebGLRenderingContext) {
	const originalTexImage2D = WebGLRenderingContext.prototype.texImage2D;

	WebGLRenderingContext.prototype.texImage2D = function (...args) {
		const useDefaultSkin = localStorage.getItem('useDefaultSkin') === 'true';
		const source = args[5];

		if (!useDefaultSkin || !(source instanceof HTMLImageElement)) {
			originalTexImage2D.apply(this, args);
			return;
		}

		const skinMap = {
			[originalSkinURL1]: {
				head:
					localStorage.getItem('defaultHeadColor') ||
					defaultColors.default.head,
				body:
					localStorage.getItem('defaultBodyColor') ||
					defaultColors.default.body,
			},
			[originalSkinURL2]: {
				head: localStorage.getItem('rubyHeadColor') || defaultColors.ruby.head,
				body: localStorage.getItem('rubyBodyColor') || defaultColors.ruby.body,
			},
			[originalSkinURL3]: {
				head:
					localStorage.getItem('sapphireHeadColor') ||
					defaultColors.sapphire.head,
				body:
					localStorage.getItem('sapphireBodyColor') ||
					defaultColors.sapphire.body,
			},
		};

		if (skinMap[source.src]) {
			const { head, body } = skinMap[source.src];
			const coloredTexture = createGradientTexture(head, body);
			originalTexImage2D.call(
				this,
				args[0],
				args[1],
				args[2],
				args[3],
				args[4],
				coloredTexture
			);
		} else {
			originalTexImage2D.apply(this, args);
		}
	};
}

function createGradientTexture(headColor, bodyColor) {
	const canvas = document.createElement('canvas');
	canvas.width = 512;
	canvas.height = 512;
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = bodyColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const headRegion = {
		x: 0,
		y: 0,
		width: canvas.width * 0.4,
		height: canvas.height * 0.4,
	};
	ctx.fillStyle = headColor;
	ctx.fillRect(headRegion.x, headRegion.y, headRegion.width, headRegion.height);

	const legWidth = canvas.width / 8;
	const legHeight = canvas.height / 4;

	ctx.fillStyle = bodyColor;
	ctx.fillRect(legWidth * 1, legHeight * 3, legWidth * 2, legHeight);

	ctx.fillRect(legWidth * 3, legHeight * 3, legWidth * 2, legHeight);

	return canvas;
}

const loadingScreen = document.createElement('div');
loadingScreen.style.position = 'fixed';
loadingScreen.style.top = '0';
loadingScreen.style.left = '0';
loadingScreen.style.width = '100%';
loadingScreen.style.height = '100%';
loadingScreen.style.display = 'flex';
loadingScreen.style.backgroundColor = 'black';
loadingScreen.style.justifyContent = 'center';
loadingScreen.style.alignItems = 'center';
loadingScreen.style.flexDirection = 'column';
loadingScreen.style.zIndex = '9999';

const img2 = document.createElement('img');
img2.src = 'https://i.imgur.com/XfbtnPS.png';
img2.style.width = 'auto';
img2.style.height = '222px';
img2.style.marginTop = '-100px';

const img1 = document.createElement('img');
img1.src =
	'https://upload.wikimedia.org/wikipedia/commons/3/3f/Windows-loading-cargando.gif';
img1.style.width = 'auto';
img1.style.height = '30px';

const span1 = document.createElement('span');
span1.textContent = 'welcome...';
span1.style.color = '#e8e8e8';
span1.style.fontSize = '19px';
span1.style.marginLeft = '15px';
span1.style.setProperty('font-family', 'sans-serif', 'important');

const img1Container = document.createElement('div');
img1Container.style.display = 'flex';
img1Container.style.alignItems = 'center';
img1Container.style.marginTop = '-10px';
img1Container.appendChild(img1);
img1Container.appendChild(span1);

const termscon = document.createElement('div');
termscon.style.height = '434px';
termscon.style.width = '434px';
termscon.style.position = 'absolute';
termscon.style.background = '#1a1a1a';
termscon.style.borderRight = '5px solid #555555';
termscon.style.borderBottom = '5px solid #555555';
termscon.style.fontFamily = 'sans-serif';
termscon.style.padding = '10px';
termscon.style.display = 'none';

const termsspan = document.createElement('span');
termsspan.textContent = 'before you go, you must agree to the following:';
termsspan.style.color = 'white';
termsspan.style.fontSize = '14px';

const textarea1 = document.createElement('textarea');
textarea1.style.resize = 'none';
textarea1.style.marginTop = '13px';
textarea1.style.background = '#222222';
textarea1.style.color = 'white';
textarea1.style.setProperty('font-family', 'monospace', 'important');
textarea1.style.width = '412px';
textarea1.style.height = '348px';
textarea1.readOnly = true;
textarea1.style.padding = '10px';
textarea1.innerHTML = `
Acceptance of Use
By using this code, you agree to the terms outlined below. If you do not agree to these terms, you are prohibited from using this code.

Risk and Disclaimer
The code utilizes localStorage to store user preferences and settings. This storage method is local to the user's browser and device. The developer is not responsible for any data loss, unintended behavior, or conflicts arising from browser settings or security configurations.

Prohibited Actions
Users are strictly prohibited from modifying, reverse-engineering, or repackaging this code for redistribution or any other purpose without explicit permission from the developer.
Misuse of this code for malicious purposes or to violate any applicable laws is strictly prohibited.

Security Notice
The code includes features that depend on user-provided inputs, such as URLs or files. Users are advised to ensure the safety and integrity of any input data to avoid introducing security vulnerabilities.
Changes made to settings via this code are stored locally. Users are responsible for ensuring the security of their own devices and browsers.

Warranty and Liability
This code is provided "as is" without any warranty, expressed or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.
The developer is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the code.
`;

const wrapwrap = document.createElement('div');
wrapwrap.style.display = 'flex';
wrapwrap.style.alignItems = 'center';
wrapwrap.style.marginTop = '12px';

const agreecheck = document.createElement('input');
agreecheck.type = 'checkbox';
agreecheck.style.marginRight = '10px';
agreecheck.style.marginTop = '-1px';

const agreelabel = document.createElement('span');
agreelabel.textContent = 'i have read and agreed';
agreelabel.style.fontSize = '14px';
agreelabel.style.color = 'white';
agreelabel.style.marginTop = '-3px';

const disaggreelabel = document.createElement('span');
disaggreelabel.textContent = '*required';
disaggreelabel.style.fontSize = '14px';
disaggreelabel.style.color = '#d93025';
disaggreelabel.style.marginTop = '-3px';
disaggreelabel.style.marginLeft = '5px';
disaggreelabel.style.display = 'none';

const agreebuttonparent = document.createElement('div');
agreebuttonparent.style.display = 'flex';
agreebuttonparent.style.justifyContent = 'flex-end';

const agreebutton = document.createElement('button');
agreebutton.textContent = 'ENTER';
agreebutton.style.background = 'none';
agreebutton.style.border = 'none';
agreebutton.style.textDecoration = 'underline';
agreebutton.style.marginTop = '-20px';
agreebutton.style.color = 'white';

termscon.appendChild(termsspan);
termscon.appendChild(textarea1);
termscon.appendChild(wrapwrap);

wrapwrap.appendChild(agreecheck);
wrapwrap.appendChild(agreelabel);
wrapwrap.appendChild(disaggreelabel);

agreebuttonparent.appendChild(agreebutton);
termscon.appendChild(agreebuttonparent);

loadingScreen.appendChild(termscon);

loadingScreen.appendChild(img2);
loadingScreen.appendChild(img1Container);

document.body.appendChild(loadingScreen);

function showLoadingScreen() {
	const hasSeenLoadingScreen1 = localStorage.getItem('hasSeenLoadingScreen1');
	if (!hasSeenLoadingScreen1) {
		loadingScreen.style.display = 'flex';
		setTimeout(() => {
			img1Container.style.display = 'none';
			img2.style.display = 'none';
			termscon.style.display = 'block';
		}, 15000);
	} else {
		loadingScreen.style.display = 'none';
	}
}

function handleAgreeButtonClick() {
	if (agreecheck.checked) {
		disaggreelabel.style.display = 'none';
		localStorage.setItem('hasSeenLoadingScreen1', 'true');
		loadingScreen.style.display = 'none';
		wirklich();
	} else {
		disaggreelabel.style.display = 'block';
	}
}

function saveCheckboxState() {
	localStorage.setItem('agreecheckState', agreecheck.checked);
}

function restoreCheckboxState() {
	const savedState = localStorage.getItem('agreecheckState');
	agreecheck.checked = savedState === 'true';
}

function handleBeforeUnload(event) {
	const hasSeenLoadingScreen1 = localStorage.getItem('hasSeenLoadingScreen1');
	if (!hasSeenLoadingScreen1 || !agreecheck.checked) {
		event.preventDefault();
		event.returnValue = '';
	}
}

agreebutton.addEventListener('click', handleAgreeButtonClick);
agreecheck.addEventListener('change', saveCheckboxState);
window.addEventListener('beforeunload', handleBeforeUnload);

restoreCheckboxState();
showLoadingScreen();
