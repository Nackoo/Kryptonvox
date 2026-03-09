// AUTO-GENERATED FILE
// Source modules are in /source code/src
// Rebuild with: powershell -ExecutionPolicy Bypass -File "source code/scripts/build-main.ps1"

// --- BEGIN 00-utils.js ---
function getStoredBool(key, defaultValue = false) {
	const rawValue = localStorage.getItem(key);
	if (rawValue === null) {
		return defaultValue;
	}

	return rawValue === 'true';
}

function setStoredBool(key, value) {
	localStorage.setItem(key, value ? 'true' : 'false');
}

function getStoredJSON(key, fallbackValue) {
	try {
		const rawValue = localStorage.getItem(key);
		if (rawValue === null || rawValue === '') {
			return fallbackValue;
		}

		const parsed = JSON.parse(rawValue);
		return parsed ?? fallbackValue;
	} catch {
		return fallbackValue;
	}
}

function setStoredJSON(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}
// --- END 00-utils.js ---

// --- BEGIN 00-core-shell.js ---
const host = window.location.hostname;

const baseURL = host.includes('historynotes.club')
	? 'https://historynotes.club/package/'
	: 'https://voxiom.io/package/';

const originalSkinURL1 = baseURL + "cb1d14c1ff0efb6a282b.png";
const originalSkinURL2 = baseURL + "aef55bdd0c3c3c3734f8.png";
const originalSkinURL3 = baseURL + "ecca1227c2e0406be225.png";

const defaultColors = {
	default: { head: '#24b44d', body: '#ee1c23' },
	ruby: { head: '#ffffff', body: '#ee1c23' },
	sapphire: { head: '#ffffff', body: '#1919ff' } 
};

const ADVANCED_SWAP_STORAGE_KEY_MAP = 'customSkinMap';
const ADVANCED_SWAP_STORAGE_KEY_ENABLED = 'useCustomSkins';
const ADVANCED_SWAP_INPUT_DEBOUNCE_MS = 180;
const ADVANCED_DEFAULT_SKIN_REPLACEMENTS = Object.freeze({
	[originalSkinURL1]: 'https://i.imgur.com/sRUORwO.png',
	[originalSkinURL2]: 'https://i.imgur.com/0WkMmAR.png',
	[originalSkinURL3]: 'https://i.imgur.com/XBSg7G4.png',
});

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

const container = document.createElement('div');

if (localStorage.getItem('isContainerHidden') === null) {
	setStoredBool('isContainerHidden', true);
}

const isHidden = getStoredBool('isContainerHidden', true);

container.style.cssText = `
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 10px;
	background: #141414;
	display: ${isHidden ? 'none' : 'flex'};
	flex-direction: column;
	overflow: auto;
	max-height: 555px;
	border: 1px solid #555555;
	font-family: cursive;
	scrollbar-width: thin;
	scrollbar-color: #888888 #333333;
`;

const style = document.createElement('style');
style.innerHTML = `
	div::-webkit-scrollbar {
		width: 1px;height:1px;
	}
	div::-webkit-scrollbar-thumb {
		background-color: #888888;
		border-radius: 10px;
	}
	div::-webkit-scrollbar-track {
		background-color: #333333;
	}
`;
document.head.appendChild(style);

const hideText = document.createElement('span');
hideText.style.cssText = `
	margin-bottom: 7px;
	font-size: 14px;
`;
container.appendChild(hideText);

function createColorPicker(savedColor, storageKey) {
	const colorPicker = document.createElement('input');
	colorPicker.type = 'color';
	colorPicker.value = savedColor;
	colorPicker.style.cssText = `
		height: 22px;
		width: 30px;
	`;

	colorPicker.addEventListener('input', function () {
		const selectedColor = colorPicker.value;
		localStorage.setItem(storageKey, selectedColor);
	});

	return colorPicker;
}

const hr = document.createElement('hr');
container.appendChild(hr);

const info = document.createElement('p');
info.textContent = 'head - body color';
info.style.cssText = `margin-bottom: 9px`;
container.appendChild(info);

const ver = document.createElement('div');
ver.innerHTML = 'krypton';
ver.title = 'version 8 march 2026';
container.appendChild(ver);

hr.style.cssText = `
    margin-top: 7px;
	margin-bottom: 7px;
	border: 1px solid grey;
`;
ver.style.cssText = `
	font-size: 14px;
	position: absolute;
	right: 8px;
	top: 10px;
`;
info.style.cssText = `
	font-size: 14px;
	margin-bottom: 9px;
	margin-top: 3px;
`;

['default', 'ruby', 'sapphire'].forEach((skin) => {
	const skinWrapper = document.createElement('div');

	const headPicker = createColorPicker(
		savedColors[skin].head,
		`${skin}HeadColor`
	);
	const bodyPicker = createColorPicker(
		savedColors[skin].body,
		`${skin}BodyColor`
	);

	const label = document.createElement('span');
	label.textContent = `${skin[0]}${skin.slice(1)} skin`;

	skinWrapper.style.cssText = `
		display: flex;
		align-items: center;
		margin-bottom: 3px;
	`;
	label.style.cssText = `
		margin-left: 7px;
		font-size: 14px;
		color: white;
	`;
	headPicker.style.cssText = `
		border: none;
		width: 40px;
	`;
	bodyPicker.style.cssText = `
		margin-left: 3px;
		border: none;
		width: 40px;
	`;

	skinWrapper.appendChild(headPicker);
	skinWrapper.appendChild(bodyPicker);
	skinWrapper.appendChild(label);

	container.appendChild(skinWrapper);
});

const checkboxWrapper = document.createElement('div');

const defaultSkinCheckbox = document.createElement('input');
defaultSkinCheckbox.type = 'checkbox';
defaultSkinCheckbox.checked = getStoredBool('useDefaultSkin');

const checkboxLabel = document.createElement('span');
checkboxLabel.textContent = 'basic swapper';

checkboxWrapper.appendChild(defaultSkinCheckbox);
checkboxWrapper.appendChild(checkboxLabel);
container.appendChild(checkboxWrapper);

defaultSkinCheckbox.addEventListener('change', function () {
	setStoredBool('useDefaultSkin', defaultSkinCheckbox.checked);
});

function loadAdvancedSkinMapForUI() {
	const parsed = getStoredJSON(
		ADVANCED_SWAP_STORAGE_KEY_MAP,
		ADVANCED_DEFAULT_SKIN_REPLACEMENTS
	);
	if (!parsed || typeof parsed !== 'object') {
		return { ...ADVANCED_DEFAULT_SKIN_REPLACEMENTS };
	}

	return {
		...ADVANCED_DEFAULT_SKIN_REPLACEMENTS,
		...parsed,
	};
}

let advancedSkinMapState = loadAdvancedSkinMapForUI();
let advancedSkinPersistTimer = null;

function persistAdvancedSkinMapForUI(nextMap) {
	if (advancedSkinPersistTimer) {
		clearTimeout(advancedSkinPersistTimer);
		advancedSkinPersistTimer = null;
	}

	advancedSkinMapState = { ...nextMap };
	setStoredJSON(ADVANCED_SWAP_STORAGE_KEY_MAP, advancedSkinMapState);
	if (window.kryptonSkinSwapper?.setAdvancedSkinMap) {
		window.kryptonSkinSwapper.setAdvancedSkinMap(advancedSkinMapState);
	}
}

function scheduleAdvancedSkinPersist() {
	if (advancedSkinPersistTimer) {
		clearTimeout(advancedSkinPersistTimer);
	}

	advancedSkinPersistTimer = setTimeout(() => {
		persistAdvancedSkinMapForUI(advancedSkinMapState);
	}, ADVANCED_SWAP_INPUT_DEBOUNCE_MS);
}

const advancedSkinWrapper = document.createElement('div');
const advancedSkinCheckbox = document.createElement('input');
advancedSkinCheckbox.type = 'checkbox';
advancedSkinCheckbox.checked = getStoredBool(
	ADVANCED_SWAP_STORAGE_KEY_ENABLED,
	false
);

const advancedSkinLabel = document.createElement('span');
advancedSkinLabel.textContent = 'advanced swapper';

advancedSkinWrapper.appendChild(advancedSkinCheckbox);
advancedSkinWrapper.appendChild(advancedSkinLabel);
container.appendChild(advancedSkinWrapper);

const advancedSkinInputGroup = document.createElement('div');
advancedSkinInputGroup.style.cssText = `
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-top: 6px;
`;
container.appendChild(advancedSkinInputGroup);

function createAdvancedSkinInputRow(labelText, sourceUrl) {
	const row = document.createElement('div');
	row.style.cssText = `
		display: flex;
		align-items: center;
	`;

	const label = document.createElement('span');
	label.textContent = `${labelText}:`;
	label.style.cssText = `
		font-size: 13px;
		color: white;
		width: 62px;
	`;

	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'https://...';
	input.value = advancedSkinMapState[sourceUrl] || '';
	input.style.cssText = `
		width: 170px;
		border: none;
		color: white;
		background: #3c3c3c;
		padding: 3px 5px;
	`;

	input.addEventListener('input', () => {
		advancedSkinMapState[sourceUrl] = input.value.trim();
		scheduleAdvancedSkinPersist();
	});

	row.appendChild(label);
	row.appendChild(input);
	advancedSkinInputGroup.appendChild(row);

	return input;
}

const advancedDefaultInput = createAdvancedSkinInputRow('default', originalSkinURL1);
const advancedRubyInput = createAdvancedSkinInputRow('ruby', originalSkinURL2);
const advancedSapphireInput = createAdvancedSkinInputRow('sapphire', originalSkinURL3);

function resetAdvancedSkinInputs() {
	advancedDefaultInput.value =
		ADVANCED_DEFAULT_SKIN_REPLACEMENTS[originalSkinURL1];
	advancedRubyInput.value =
		ADVANCED_DEFAULT_SKIN_REPLACEMENTS[originalSkinURL2];
	advancedSapphireInput.value =
		ADVANCED_DEFAULT_SKIN_REPLACEMENTS[originalSkinURL3];

	const nextMap = {
		...ADVANCED_DEFAULT_SKIN_REPLACEMENTS,
	};
	persistAdvancedSkinMapForUI(nextMap);
}

const advancedSkinResetButton = document.createElement('button');
advancedSkinResetButton.textContent = 'reset advanced skins';
advancedSkinResetButton.type = 'button';
advancedSkinResetButton.style.cssText = `
	margin-top: 3px;
	padding: 2px 5px;
	font-size: 12px;
	border: 1px solid white;
	background: none;
	color: white;
	cursor: pointer;
	align-self: flex-start;
`;
advancedSkinResetButton.addEventListener('click', () => {
	resetAdvancedSkinInputs();
	if (window.kryptonSkinSwapper?.resetAdvancedSkinMap) {
		window.kryptonSkinSwapper.resetAdvancedSkinMap();
	}
});
advancedSkinInputGroup.appendChild(advancedSkinResetButton);

function updateAdvancedSkinUIVisibility() {
	advancedSkinInputGroup.style.display = advancedSkinCheckbox.checked
		? 'flex'
		: 'none';
}

advancedSkinCheckbox.addEventListener('change', () => {
	setStoredBool(ADVANCED_SWAP_STORAGE_KEY_ENABLED, advancedSkinCheckbox.checked);
	updateAdvancedSkinUIVisibility();
	if (window.kryptonSkinSwapper?.setAdvancedSkinSwapEnabled) {
		window.kryptonSkinSwapper.setAdvancedSkinSwapEnabled(
			advancedSkinCheckbox.checked
		);
	}
});

updateAdvancedSkinUIVisibility();

const hrr = document.createElement('hr');
container.appendChild(hrr);

document.addEventListener('DOMContentLoaded', () => {
    const saved = getStoredBool('useFocusMode');
    focusModeCheckbox.checked = saved;
    toggleFocusMode(saved);
});

const focusModeWrapper = document.createElement('div');

const focusModeCheckbox = document.createElement('input');
focusModeCheckbox.type = 'checkbox';
focusModeCheckbox.checked = false;

const focusModeLabel = document.createElement('span');

focusModeWrapper.appendChild(focusModeCheckbox);
focusModeWrapper.appendChild(focusModeLabel);
container.appendChild(focusModeWrapper);

const hrr1 = document.createElement('hr');
container.appendChild(hrr1);

checkboxWrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 7px;
`;
advancedSkinWrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 3px;
`;
hrr1.style.cssText = `
	border: 1px solid grey;
	margin-top: 8px;
`;
focusModeLabel.style.cssText = `
	font-size: 14px;
	margin-top: 3px;
`;
focusModeCheckbox.style.cssText = `
	margin-right: 10px;
	margin-top: 3px;
`;
focusModeWrapper.style.cssText = `
	display: flex;
	align-items: center;
`;
defaultSkinCheckbox.style.cssText = `
	margin-right: 10px;
`;
advancedSkinCheckbox.style.cssText = `
	margin-right: 10px;
`;
checkboxLabel.style.cssText = `
	font-size: 14px;
	color: white;
`;
advancedSkinLabel.style.cssText = `
	font-size: 14px;
	color: white;
`;
hrr.style.cssText = `
	border: 1px solid grey;
	margin-top: 8px;
	margin-bottom: 5px;
`;

function toggleFocusMode(isChecked) {
    setStoredBool('useFocusMode', isChecked);

    if (isChecked) {
        document.body.classList.add("focus-mode");
    } else {
        document.body.classList.remove("focus-mode");
    }
}

focusModeCheckbox.addEventListener('change', function () {
	toggleFocusMode(focusModeCheckbox.checked);
});

function updateCrosshair() {
	const isEnabled = getStoredBool('crosshairEnabled');
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
crosshairWrapper.style.cssText = `
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	align-items: flex-start;
`;

const enableCheckboxWrapper = document.createElement('div');
enableCheckboxWrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-bottom: 5px;
`;

const enableCheckbox = document.createElement('input');
enableCheckbox.type = 'checkbox';
enableCheckbox.style.cssText = `
	margin-right: 5px;
`;
enableCheckbox.id = 'enable-crosshair';
enableCheckboxWrapper.appendChild(enableCheckbox);

const enableLabel = document.createElement('label');
enableLabel.textContent = 'enable crosshair';
enableLabel.style.cssText = `
	margin-left: 5px;
	font-size: 14px;
`;
enableLabel.htmlFor = 'enable-crosshair';
enableCheckboxWrapper.appendChild(enableLabel);
crosshairWrapper.appendChild(enableCheckboxWrapper);

const chwrapwrap = document.createElement('div');
chwrapwrap.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 3px;
`;
crosshairWrapper.appendChild(chwrapwrap);

const chLabel = document.createElement('span');
chLabel.textContent = 'upload ch:';
chLabel.style.cssText = `
	margin-right: 5px;
	font-size: 14px;
`;
chwrapwrap.appendChild(chLabel);

const crosshairUrlInput = document.createElement('input');
crosshairUrlInput.type = 'text';
crosshairUrlInput.placeholder = 'Enter URL';
crosshairUrlInput.style.cssText = `
	margin-top: 2px;
	width: 195px;
	margin-right: 9px;
	border: none;
	color: white;
	background: #3c3c3c;
	padding: 2px;
	padding-left: 4px;
	padding-right: 4px;
`;
chwrapwrap.appendChild(crosshairUrlInput);

const sizeSliderWrapper = document.createElement('div');
sizeSliderWrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 11px;
`;

const sizeLabel = document.createElement('span');
sizeLabel.textContent = 'size:';
sizeLabel.style.cssText = `
	font-size: 14px;
	margin-top: -4px;
`;
sizeSliderWrapper.appendChild(sizeLabel);

const sizeSlider = document.createElement('input');
sizeSlider.type = 'range';
sizeSlider.min = '1';
sizeSlider.max = '200';
sizeSlider.step = '1';
sizeSlider.value = '100';
sizeSlider.style.cssText = `
	margin-left: 5px;
	width: 195px;
`;
sizeSliderWrapper.appendChild(sizeSlider);

const sizeValueDisplay = document.createElement('span');
sizeValueDisplay.textContent = `${sizeSlider.value}px`;
sizeValueDisplay.style.cssText = `
	font-size: 14px;
	margin-left: 5px;
`;
sizeSliderWrapper.appendChild(sizeValueDisplay);

crosshairWrapper.appendChild(sizeSliderWrapper);
container.appendChild(crosshairWrapper);

const updateSettings = () => {
	const crosshairUrl = crosshairUrlInput.value.trim();
	const crosshairSize = sizeSlider.value + 'px';

	sizeValueDisplay.textContent = `${sizeSlider.value}px`;

	localStorage.setItem('crosshairSize', crosshairSize);
	setStoredBool('crosshairEnabled', enableCheckbox.checked);
	localStorage.setItem('crosshairUrl', crosshairUrl);
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

window.addEventListener('load', () => {
	enableCheckbox.checked = getStoredBool('crosshairEnabled');
	crosshairUrlInput.value = localStorage.getItem('crosshairUrl') || '';
	sizeSlider.value = parseInt(localStorage.getItem('crosshairSize'), 10) || 100;
	sizeValueDisplay.textContent = `${sizeSlider.value}px`;

	updateCrosshair();
});

// --- END 00-core-shell.js ---

// --- BEGIN 01-auto-translate-toggle.js ---
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
// --- END 01-auto-translate-toggle.js ---

// --- BEGIN 02-chat-translator.js ---
function initializeScript() {
	'use strict';

	const CHAT_INPUT_SELECTOR = '.sc-dpAhYB.ipDvnq';
	const languages = {
		ja: 'Japanese',
		ko: 'Korean',
		'zh-CN': 'Chinese (Simplified)',
		'zh-TW': 'Chinese (Traditional)',
		fr: 'French',
		de: 'German',
		es: 'Spanish',
		ru: 'Russian',
		ar: 'Arabic',
		it: 'Italian',
		pt: 'Portuguese',
		nl: 'Dutch',
		tr: 'Turkish',
		pl: 'Polish',
		id: 'Indonesian',
		th: 'Thai',
		vi: 'Vietnamese',
		hi: 'Hindi',
		sv: 'Swedish',
		tl: 'Tagalog',
	};

	const uiContainer = document.createElement('div');
	uiContainer.style.cssText = `
		position: absolute;
		background: rgba(0,0,0,0.3);
		padding: 8px;
		z-index: 800;
		display: none;
		border-top: 1px solid grey;
		font-size: 14px;
	`;

	const inputBox = document.createElement('input');
	inputBox.type = 'text';
	inputBox.placeholder = 'alt + shift to type';
	inputBox.style.cssText = `
		width: 100%;
		padding: 5px;
		font-size: 12px;
		color: white;
		border: 1px solid grey;
		background: rgba(0,0,0,0.2);
		margin-right: 5px;
	`;

	const langSelect = document.createElement('select');
	langSelect.style.cssText = `
		color: grey;
		background: rgba(0,0,0,0.2);
		font-size: 12px;
	`;

	for (const [langCode, label] of Object.entries(languages)) {
		const option = document.createElement('option');
		option.style.cssText = `
			background: #141414;
			color: white;
		`;
		option.value = langCode;
		option.textContent = label;
		langSelect.appendChild(option);
	}

	langSelect.value = localStorage.getItem('selectedLanguage') || 'ja';
	langSelect.addEventListener('change', () => {
		localStorage.setItem('selectedLanguage', langSelect.value);
	});

	uiContainer.appendChild(inputBox);
	uiContainer.appendChild(langSelect);
	document.body.appendChild(uiContainer);

	function getMainChatInput() {
		return document.querySelector(CHAT_INPUT_SELECTOR);
	}

	async function translateText(text, targetLang) {
		const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
		try {
			const response = await fetch(url);
			const result = await response.json();
			return result[0].map((item) => item[0]).join('');
		} catch (error) {
			console.error('Translation error:', error);
			return text;
		}
	}

	function updateOutputValue(text) {
		setTimeout(() => {
			const outputInput = getMainChatInput();
			if (!outputInput) {
				return;
			}

			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value'
			).set;
			nativeInputValueSetter.call(outputInput, text);
			outputInput.dispatchEvent(new Event('input', { bubbles: true }));
		}, 10);
	}

	let debounceTimer;
	function handleInputChange() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			const text = inputBox.value.trim();
			const targetLang = langSelect.value;

			if (!text) {
				updateOutputValue('');
				return;
			}

			const translatedText = await translateText(text, targetLang);
			updateOutputValue(translatedText);
		}, 300);
	}

	inputBox.addEventListener('keydown', (event) => {
		if (event.key !== 'Enter') {
			event.stopPropagation();
			return;
		}

		const outputInput = getMainChatInput();
		if (outputInput) {
			outputInput.focus();
		}
		inputBox.value = '';
	});

	inputBox.addEventListener('input', handleInputChange);
	inputBox.addEventListener('focus', () => updateOutputValue(''));

	let altPressed = false;
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Alt') {
			altPressed = true;
		} else if (altPressed && event.key === 'Shift') {
			event.preventDefault();
			inputBox.focus();
			altPressed = false;
		}
	});

	document.addEventListener('keyup', (event) => {
		if (event.key === 'Alt') {
			altPressed = false;
		}
	});

	function updateUIPosition() {
		const targetElement = getMainChatInput();
		if (!targetElement) {
			uiContainer.style.visibility = 'hidden';
			return;
		}

		const rect = targetElement.getBoundingClientRect();
		uiContainer.style.top = `${rect.bottom}px`;
		uiContainer.style.left = `${rect.left}px`;
		uiContainer.style.width = `${rect.width - 16}px`;
		uiContainer.style.visibility = 'visible';
	}

	const translateInputSpacerStyle = document.createElement('style');
	translateInputSpacerStyle.innerHTML = `${CHAT_INPUT_SELECTOR} { margin-bottom: 55px; }`;

	let uiInterval;
	function enableChatTranslator() {
		uiContainer.style.display = 'flex';
		document.head.appendChild(translateInputSpacerStyle);
		uiInterval = setInterval(updateUIPosition, 1000);
		setStoredBool('translateMsg', true);
	}

	function disableChatTranslator() {
		uiContainer.style.display = 'none';
		clearInterval(uiInterval);
		if (translateInputSpacerStyle.parentNode) {
			translateInputSpacerStyle.parentNode.removeChild(translateInputSpacerStyle);
		}
		setStoredBool('translateMsg', false);
	}

	const chatTranslatorRow = document.createElement('div');
	chatTranslatorRow.style.cssText = `
		color: white;
		display: flex;
		align-items: center;
		margin-top: 7px;
		margin-bottom: 1px;
	`;

	const translatecheckbox = document.createElement('input');
	translatecheckbox.type = 'checkbox';
	translatecheckbox.checked = getStoredBool('translateMsg');

	const translatelabel = document.createElement('label');
	translatelabel.textContent = 'chat translator';
	translatelabel.style.cssText = `
		margin-left: 10px;
		font-size: 14px;
	`;

	chatTranslatorRow.appendChild(translatecheckbox);
	chatTranslatorRow.appendChild(translatelabel);

	if (translatecheckbox.checked) {
		enableChatTranslator();
	}

	translatecheckbox.addEventListener('change', () => {
		if (translatecheckbox.checked) {
			enableChatTranslator();
		} else {
			disableChatTranslator();
		}
	});

	const uniqueColorRow = document.createElement('div');
	uniqueColorRow.style.cssText = `
		color: white;
		display: flex;
		align-items: center;
		margin-top: 7px;
		margin-bottom: 1px;
	`;

	const uniqueColorCheckbox = document.createElement('input');
	uniqueColorCheckbox.type = 'checkbox';
	uniqueColorCheckbox.checked = getStoredBool('uniqueUsername');

	const uniqueColorLabel = document.createElement('label');
	uniqueColorLabel.textContent = 'each username has unique color';
	uniqueColorLabel.style.cssText = `
		margin-left: 10px;
		font-size: 14px;
	`;

	uniqueColorCheckbox.addEventListener('change', () => {
		setStoredBool('uniqueUsername', uniqueColorCheckbox.checked);
	});

	uniqueColorRow.appendChild(uniqueColorCheckbox);
	uniqueColorRow.appendChild(uniqueColorLabel);

	const countdownRow = document.createElement('div');
	countdownRow.style.cssText = `
		color: white;
		display: flex;
		align-items: center;
		margin-top: 7px;
		margin-bottom: 1px;
	`;

	const countdownCheckbox = document.createElement('input');
	countdownCheckbox.type = 'checkbox';

	const countdownLabel = document.createElement('label');
	countdownLabel.textContent = '"vox countdown [second]"';
	countdownLabel.style.cssText = `
		margin-left: 10px;
		font-size: 14px;
	`;

	countdownCheckbox.addEventListener('change', () => {
		isCountdownEnabled = countdownCheckbox.checked;
	});

	countdownRow.appendChild(countdownCheckbox);
	countdownRow.appendChild(countdownLabel);

	const translateToLabel = document.createElement('p');
	translateToLabel.textContent = 'translate chat language into';
	translateToLabel.style.cssText = `
		font-size: 14px;
		margin: 10px 0;
	`;

	const translateLanguageSelectWrapper = document.createElement('div');
	translateLanguageSelectWrapper.innerHTML = `
		<select id="language-select" style="
			width: 100%;
			border: 1px solid grey;
			background: #333333;
			color: white;
			margin-bottom: 5px;
		">
			<option value="en">English</option>
			<option value="ja">Japanese</option>
			<option value="ko">Korean</option>
			<option value="zh-CN">Chinese (Simplified)</option>
			<option value="zh-TW">Chinese (Traditional)</option>
			<option value="fr">French</option>
			<option value="de">German</option>
			<option value="es">Spanish</option>
			<option value="ru">Russian</option>
			<option value="ar">Arabic</option>
			<option value="it">Italian</option>
			<option value="pt">Portuguese</option>
			<option value="nl">Dutch</option>
			<option value="tr">Turkish</option>
			<option value="pl">Polish</option>
			<option value="id">Indonesian</option>
			<option value="th">Thai</option>
			<option value="vi">Vietnamese</option>
			<option value="hi">Hindi</option>
			<option value="sv">Swedish</option>
			<option value="tl">Tagalog</option>
		</select>
	`;

	translationOptionsContainer.appendChild(translateToLabel);
	translationOptionsContainer.appendChild(translateLanguageSelectWrapper);

	container.appendChild(chatTranslatorRow);
	container.appendChild(translationOptionsContainer);
	container.appendChild(hrr);
	container.appendChild(uniqueColorRow);
	container.appendChild(countdownRow);

	const translateTargetSelect =
		translateLanguageSelectWrapper.querySelector('#language-select');
	translateTargetSelect.value = localStorage.getItem('languagePreference') || 'en';
	translateTargetSelect.addEventListener('change', () => {
		localStorage.setItem('languagePreference', translateTargetSelect.value);
	});
}

initializeScript();

const hrr11 = document.createElement('hr');
hrr11.style.cssText = `
	border: 1px solid grey;
	margin-top: 11px;
	margin-bottom: 10px;
`;
container.appendChild(hrr11);
// --- END 02-chat-translator.js ---

// --- BEGIN 03-mentions-and-reset.js ---
const mentionWrapper = document.createElement('div');
mentionWrapper.style.cssText = `
	display: flex;
	align-items: center;
`;

const mentionCheckbox = document.createElement('input');
mentionCheckbox.type = 'checkbox';
mentionCheckbox.id = 'mention-check';
mentionCheckbox.checked = getStoredBool('mentionCheck');

const mentionLabel = document.createElement('label');
mentionLabel.htmlFor = 'mention-check';
mentionLabel.innerText = 'mention detector';
mentionLabel.style.cssText = `
	font-size: 14px;
	margin-left: 10px;
`;

mentionWrapper.appendChild(mentionCheckbox);
mentionWrapper.appendChild(mentionLabel);
container.appendChild(mentionWrapper);

const mentionInputList = document.createElement('div');
mentionInputList.style.cssText = `
	display: flex;
	flex-direction: column;
	gap: 6px;
	margin-top: 10px;
`;
container.appendChild(mentionInputList);

function loadMentionValues() {
	const parsed = getStoredJSON('mentionValues', []);
	if (!Array.isArray(parsed) || parsed.length === 0) {
		return [''];
	}

	return parsed;
}

function saveMentionInputs() {
	const allInputs = mentionInputList.querySelectorAll('input');
	const values = Array.from(allInputs)
		.map((input) => input.value.trim())
		.filter((value) => value.length > 1);
	setStoredJSON('mentionValues', values);
}

function createMentionInput(initialValue = '') {
	const inputWrapper = document.createElement('div');
	inputWrapper.style.cssText = `
		display: flex;
		align-items: center;
	`;

	const mentionInput = document.createElement('input');
	mentionInput.type = 'text';
	mentionInput.placeholder = 'mention trigger';
	mentionInput.value = initialValue;
	mentionInput.style.cssText = `
		padding: 3px 5px;
		background: #3c3c3c;
		border: none;
		color: white;
		flex: 1;
	`;

	const addButton = document.createElement('button');
	addButton.innerHTML = '+';
	addButton.style.cssText = `
		background: #3c3c3c;
		border: none;
		color: white;
		cursor: pointer;
		width: 24px;
		font-size: 17px;
		height: 24px;
	`;

	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/></svg>';
	deleteButton.title = 'Delete this trigger';
	deleteButton.style.cssText = `
		background: #3c3c3c;
		color: #f55;
		border: none;
		cursor: pointer;
		width: 24px;
		height: 24px;
	`;

	addButton.onclick = () => {
		createMentionInput('');
		saveMentionInputs();
	};

	deleteButton.onclick = () => {
		if (mentionInputList.children.length <= 1) {
			return;
		}
		inputWrapper.remove();
		saveMentionInputs();
	};

	mentionInput.addEventListener('input', saveMentionInputs);

	inputWrapper.appendChild(deleteButton);
	inputWrapper.appendChild(mentionInput);
	inputWrapper.appendChild(addButton);
	mentionInputList.appendChild(inputWrapper);
}

loadMentionValues().forEach((value) => createMentionInput(value));

mentionCheckbox.addEventListener('change', () => {
	setStoredBool('mentionCheck', mentionCheckbox.checked);
	mentionInputList.style.display = mentionCheckbox.checked ? 'flex' : 'none';
});
mentionInputList.style.display = mentionCheckbox.checked ? 'flex' : 'none';

function showPopup(name, item) {
	const mentionAudio = new Audio('https://kryptonvox.netlify.app/notification.mp3');
	mentionAudio.play();

	const popup = document.createElement('div');
	popup.innerHTML = `<svg style="color:#faa61a;margin-bottom:-7px;margin-right:3px;" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z"/><path fill-rule="evenodd" d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z" clip-rule="evenodd"/><path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z"/></svg><span style="color:#04ff6c;">${name}</span> mentioned you`;
	popup.style.cssText = `
		position: fixed;
		bottom: 10px;
		right: 10px;
		background: #0d1117;
		color: #ddd;
		padding: 10px 15px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.4);
		border: 2px solid grey;
		z-index: 9999;
		transition: opacity 0.5s ease;
		opacity: 1;
		cursor: pointer;
	`;
	document.body.appendChild(popup);

	popup.onclick = () => {
		item.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	setTimeout(() => {
		popup.style.opacity = '0';
		setTimeout(() => popup.remove(), 500);
	}, 3000);
}

if (!window.__voxCountdown) {
	window.__voxCountdown = {
		interval: null,
		element: null,
	};
}

const tick = new Audio('https://voxiom.io/package/ad6949ab40e7252565dd.mp3');
const startSound = new Audio('https://voxiom.io/package/8b30d9e97bc681082db7.mp3');

function startCountdown(seconds) {
	if (window.__voxCountdown.interval) {
		return;
	}

	if (!window.__voxCountdown.element) {
		const countdownElement = document.createElement('div');
		countdownElement.style.cssText = `
			position: fixed;
			bottom: 30px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 20px;
			background: #0d1117;
			border: 1px solid grey;
			padding: 10px;
			font-weight: bold;
			color: white;
			text-shadow: 0 0 10px black;
			z-index: 99999;
			pointer-events: none;
		`;
		document.body.appendChild(countdownElement);
		window.__voxCountdown.element = countdownElement;
	}

	let remaining = seconds;
	window.__voxCountdown.element.textContent = remaining;

	window.__voxCountdown.interval = setInterval(() => {
		remaining -= 1;

		if (remaining > 0) {
			window.__voxCountdown.element.textContent = remaining;
			tick.currentTime = 0;
			tick.play();
			return;
		}

		clearInterval(window.__voxCountdown.interval);
		window.__voxCountdown.interval = null;

		window.__voxCountdown.element.textContent = 'Start!';
		startSound.currentTime = 0;
		startSound.play();

		setTimeout(() => {
			window.__voxCountdown.element.remove();
			window.__voxCountdown.element = null;
		}, 1500);
	}, 1000);
}

function stringToSoftColor(str) {
	let hash = 0;

	for (let index = 0; index < str.length; index += 1) {
		hash = str.charCodeAt(index) + ((hash << 5) - hash);
	}

	const hue = Math.abs(hash % 360);
	return `hsl(${hue}, 70%, 55%)`;
}

const mentionObserver = new MutationObserver(() => {
	if (!mentionCheckbox.checked) {
		return;
	}

	const mentionValues = getStoredJSON('mentionValues', []).filter(
		(value) => typeof value === 'string' && value.length > 0
	);
	const items = Array.from(document.querySelectorAll('.sc-wkwDy.gTfPhn'));
	if (!items.length) {
		return;
	}

	const lastItem = items[items.length - 1];

	items.forEach((item) => {
		const spans = item.querySelectorAll('span');
		if (spans.length < 3) {
			return;
		}

		const messageSpan = item.querySelector('span:last-child');
		if (!messageSpan) {
			return;
		}

		const content = messageSpan.textContent.toLowerCase();

		if (isCountdownEnabled) {
			const match = content.match(/vox countdown (\d+)/);
			if (match && !item.dataset.countdownTriggered) {
				const seconds = parseInt(match[1], 10);
				if (!Number.isNaN(seconds) && seconds > 0 && seconds < 31) {
					startCountdown(seconds);
				}
				item.dataset.countdownTriggered = 'true';
			}
		} else {
			item.dataset.countdownTriggered = 'true';
		}

		if (getStoredBool('uniqueUsername')) {
			const nameSpan = item.querySelector('span:first-child');
			if (nameSpan) {
				const name = nameSpan.textContent.trim().toLowerCase();
				nameSpan.style.color = stringToSoftColor(name);
			}
		}

		const matched = mentionValues.some((value) =>
			content.includes(value.toLowerCase())
		);

		if (!matched) {
			item.classList.remove('highlighted');
			item.style.background = '';
			delete item.dataset.popupShown;
			return;
		}

		item.classList.add('highlighted');
		item.style.background = '#b79a3e';

		if (item === lastItem && !item.dataset.popupShown) {
			const nameSpan = item.querySelector('span:first-child');
			const name = nameSpan ? nameSpan.textContent.trim() : 'Someone';
			showPopup(name, item);
			item.dataset.popupShown = 'true';
		}
	});
});

mentionObserver.observe(document.body, {
	childList: true,
	subtree: true,
	characterData: true,
});

const resetEverythingButton = document.createElement('button');
resetEverythingButton.textContent = 'restore defaults';
resetEverythingButton.style.cssText = `
	padding: 3px;
	cursor: pointer;
	background: none;
	transition: background 0.1s ease;
	border: 1px solid white;
	color: white;
	font-size: 12px;
	width: 100%;
`;
resetEverythingButton.addEventListener('mouseover', () => {
	resetEverythingButton.style.background = '#b10000';
});
resetEverythingButton.addEventListener('mouseout', () => {
	resetEverythingButton.style.background = 'none';
});
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
	if (!confirmation) {
		return;
	}

	localStorage.removeItem('crosshairEnabled');
	localStorage.removeItem('crosshairUrl');
	localStorage.removeItem('crosshairSize');

	mentionCheckbox.checked = false;
	setStoredBool('mentionCheck', false);
	setStoredJSON('mentionValues', []);
	mentionInputList.innerHTML = '';
	createMentionInput('');
	mentionInputList.style.display = 'none';

	trcheckbox.checked = false;
	setStoredBool('scriptEnabled', false);

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
	if (customStyleTag) {
		customStyleTag.remove();
	}

	localStorage.removeItem('customCSS');
	setStoredBool('cssCheckbox', false);

	const textarea = document.querySelector('textarea');
	if (textarea) {
		textarea.value = '';
	}

	const existingCssLink = document.querySelector('link[data-css]');
	if (existingCssLink) {
		existingCssLink.remove();
	}
	const defaultCssLink = document.createElement('link');
	defaultCssLink.rel = 'stylesheet';
	defaultCssLink.href = 'https://kryptonvox.netlify.app/main.css';
	defaultCssLink.dataset.css = 'true';
	document.head.appendChild(defaultCssLink);

	setStoredBool('useFocusMode', false);
	toggleFocusMode(false);

	setStoredBool('useDefaultSkin', false);
	defaultSkinCheckbox.checked = false;
	setStoredBool(ADVANCED_SWAP_STORAGE_KEY_ENABLED, false);
	advancedSkinCheckbox.checked = false;
	localStorage.removeItem(ADVANCED_SWAP_STORAGE_KEY_MAP);
	resetAdvancedSkinInputs();
	if (window.kryptonSkinSwapper?.setAdvancedSkinSwapEnabled) {
		window.kryptonSkinSwapper.setAdvancedSkinSwapEnabled(false);
	}
	if (window.kryptonSkinSwapper?.refreshAdvancedSkinCache) {
		window.kryptonSkinSwapper.refreshAdvancedSkinCache();
	}

	focusKeybind = { ...defaultKeybinds.focusKeybind };
	containerKeybind = { ...defaultKeybinds.containerKeybind };
	saveKeybinds();

	xhxcheckbox.checked = false;
	setStoredBool('uiHintDisabled', false);
	updateUIHintVisibility();

	location.reload();
});

let focusKeybind = {
	key: 'k',
	modifier: 'alt',
};
let containerKeybind = {
	key: 'z',
	modifier: 'alt',
};
// --- END 03-mentions-and-reset.js ---

// --- BEGIN 04-advanced-controls.js ---
function saveKeybinds() {
	setStoredJSON('focusKeybind', focusKeybind);
	setStoredJSON('containerKeybind', containerKeybind);
}

function loadKeybinds() {
	const savedFocusKeybind = getStoredJSON('focusKeybind', null);
	const savedContainerKeybind = getStoredJSON('containerKeybind', null);

	if (savedFocusKeybind) {
		focusKeybind = savedFocusKeybind;
	}
	if (savedContainerKeybind) {
		containerKeybind = savedContainerKeybind;
	}
}

const xhxwrapper = document.createElement('div');
xhxwrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 6px;
	margin-bottom: 7px;
`;

const xhxcheckbox = document.createElement('input');
xhxcheckbox.type = 'checkbox';

const xhxlabel = document.createElement('span');
xhxlabel.textContent = 'disable opening UI hint';
xhxlabel.style.cssText = `
	font-size: 14px;
	margin-left: 7px;
`;

const swrapper = document.createElement('div');
swrapper.style.cssText = `
	display: flex;
	align-items: center;
	margin-top: 6px;
	margin-bottom: 7px;
`;

const scheckbox = document.createElement('input');
scheckbox.type = 'checkbox';
scheckbox.checked = getStoredBool('emojipack');

function loademojipack() {
	if (document.querySelector('script[data-emojipack="true"]')) {
		return;
	}

	const script = document.createElement('script');
	script.src = `https://kryptonvox.netlify.app/emojiPack.js?v=${Date.now()}`;
	script.dataset.emojipack = 'true';
	document.body.appendChild(script);
}

scheckbox.addEventListener('change', () => {
	setStoredBool('emojipack', scheckbox.checked);
	if (scheckbox.checked) {
		loademojipack();
	}
});

if (getStoredBool('emojipack')) {
	loademojipack();
}

const slabel = document.createElement('span');
slabel.textContent = 'enable emojis (ctrl + Q for menu)';
slabel.style.cssText = `
	font-size: 14px;
	margin-left: 7px;
`;

const uiHintSpan = document.createElement('span');
uiHintSpan.style.cssText = `
	position: fixed;
	bottom: 0;
	right: 0;
	font-size: 9px;
	color: white;
	z-index: 9998;
`;

function updateuilabel() {
	const keybind = getStoredJSON('containerKeybind', {});
	const key = keybind.key || 'z';
	const modifier = keybind.modifier || 'alt';
	uiHintSpan.textContent = `${modifier} + ${key.toUpperCase()} to open UI`;
}

function updateUIHintVisibility() {
	const shouldHide = xhxcheckbox.checked;
	uiHintSpan.style.display = shouldHide ? 'none' : 'flex';
	setStoredBool('uiHintDisabled', shouldHide);
}

function initializeState() {
	xhxcheckbox.checked = getStoredBool('uiHintDisabled');
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
	button.id = 'hi';
	button.style.cssText = `
		background: none;
		border: 1px solid white;
		border-radius: 50px;
		width: 77px;
		color: white;
	`;

	button.addEventListener('click', () => {
		button.innerText = 'press a key';
		button.style.background = '#bf0000';

		const handleKeyPress = (event) => {
			event.preventDefault();
			button.style.background = 'none';
			button.innerText = event.key.toLowerCase();
			onKeySet(event.key.toLowerCase());
			saveKeybinds();
			updateLabels();
			updateuilabel();
			document.removeEventListener('keydown', handleKeyPress);
		};

		document.addEventListener('keydown', handleKeyPress);
	});

	return button;
}

function modifierMatches(event, modifier) {
	switch (modifier) {
		case 'alt':
			return event.altKey;
		case 'shift':
			return event.shiftKey;
		case 'ctrl':
			return event.ctrlKey;
		default:
			return true;
	}
}

function updateEventListeners() {
	document.removeEventListener('keydown', focusKeyHandler);
	document.removeEventListener('keydown', containerKeyHandler);
	document.addEventListener('keydown', focusKeyHandler);
	document.addEventListener('keydown', containerKeyHandler);
}

function focusKeyHandler(event) {
	if (
		event.key.toLowerCase() === focusKeybind.key &&
		modifierMatches(event, focusKeybind.modifier)
	) {
		focusModeCheckbox.checked = !focusModeCheckbox.checked;
		focusModeCheckbox.dispatchEvent(new Event('change'));
	}
}

const focusStyle = document.createElement('style');
focusStyle.innerHTML = `
	body.focus-mode table.sc-fKknU.dbJyuA,
	body.focus-mode .sc-erFXsz.cxSTIe,
	body.focus-mode .sc-eoHXOn.lpdfTz {
		visibility: hidden !important;
	}

	body.focus-mode .sc-kqnjJL {
		margin-left: -35px !important;
	}
`;
document.head.appendChild(focusStyle);

function containerKeyHandler(event) {
	if (
		event.key.toLowerCase() === containerKeybind.key &&
		modifierMatches(event, containerKeybind.modifier)
	) {
		const isHidden = container.style.display === 'none';
		container.style.display = isHidden ? 'flex' : 'none';
		setStoredBool('isContainerHidden', !isHidden);
	}
}

function createKeybindGroup(labelText, keybindObject, onUpdate) {
	const group = document.createElement('div');
	group.style.cssText = `
		display: flex;
		align-items: center;
		margin-bottom: 7px;
	`;

	const label = document.createElement('label');
	label.innerText = `${labelText}: `;
	label.style.cssText = `
		margin-right: 10px;
		font-size: 13px;
	`;

	const modifierButton = createKeybindButton(keybindObject.modifier, (newModifier) => {
		keybindObject.modifier = newModifier;
		onUpdate();
	});
	modifierButton.style.marginRight = '5px';

	const plusText = document.createElement('span');
	plusText.innerText = '+';
	plusText.style.cssText = `
		margin-right: 3px;
		margin-left: -1px;
		font-size: 14px;
	`;

	const keyButton = createKeybindButton(keybindObject.key, (newKey) => {
		keybindObject.key = newKey;
		onUpdate();
	});

	group.appendChild(label);
	group.appendChild(modifierButton);
	group.appendChild(plusText);
	group.appendChild(keyButton);

	return group;
}

function createKeybindForm() {
	const form = document.createElement('form');
	form.id = 'keybindForm';
	form.style.cssText = `
		display: none;
		flex-direction: column;
		align-items: flex-end;
	`;

	const dropdownWrapper = document.createElement('div');
	dropdownWrapper.style.cssText = `
		display: flex;
		align-items: center;
		margin-top: 7px;
	`;

	const advancedClosedIcon = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>';
	const advancedOpenIcon = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-4px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>';

	const dropdown = document.createElement('span');
	dropdown.style.cssText = `
		font-size: 14px;
		cursor: pointer;
	`;

	const dropdownHr = document.createElement('hr');
	dropdownHr.style.cssText = `
		border: 1px solid grey;
		margin-top: 5px;
		width: 191px;
	`;

	dropdownWrapper.appendChild(dropdown);
	dropdownWrapper.appendChild(dropdownHr);
	container.appendChild(dropdownWrapper);

	const keybindLabel = document.createElement('span');
	keybindLabel.textContent = 'custom keybinding:';
	keybindLabel.style.cssText = `
		font-size: 14px;
		margin-top: -8px;
		margin-bottom: 12px;
	`;
	form.appendChild(keybindLabel);

	form.appendChild(createKeybindGroup('focus mode', focusKeybind, updateEventListeners));
	form.appendChild(createKeybindGroup('container', containerKeybind, updateEventListeners));
	container.appendChild(form);

	const hrr6 = document.createElement('hr');
	hrr6.style.cssText = `
		border: 1px solid grey;
		margin-top: 9px;
		margin-bottom: 4px;
	`;
	container.appendChild(hrr6);

	xhxwrapper.appendChild(xhxcheckbox);
	xhxwrapper.appendChild(xhxlabel);
	swrapper.appendChild(scheckbox);
	swrapper.appendChild(slabel);
	container.appendChild(swrapper);
	container.appendChild(xhxwrapper);

	const cssGroup = document.createElement('div');
	cssGroup.style.cssText = `
		display: flex;
		align-items: center;
		margin-top: 3px;
		margin-bottom: 4px;
	`;

	const cssClosedIcon = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>';
	const cssOpenIcon = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>';

	const cssDropdown = document.createElement('span');
	cssDropdown.style.cssText = `
		font-size: 14px;
		cursor: pointer;
	`;

	const cssHr = document.createElement('hr');
	cssHr.style.cssText = `
		margin-top: 5px;
		border: 1px solid gray;
		margin-left: 5px;
		width: 179px;
	`;

	cssGroup.appendChild(cssDropdown);
	cssGroup.appendChild(cssHr);
	container.appendChild(cssGroup);

	const cssContainer = document.createElement('div');
	cssContainer.style.cssText = `
		position: absolute;
		top: 200px;
		right: 319px;
		padding: 10px;
		min-width: 255px;
		background: #141414;
		display: none;
		flex-direction: column;
		min-height: 365px;
		border: 1px solid #555555;
		font-family: cursive;
	`;

	const cssWrapper = document.createElement('div');
	cssWrapper.style.cssText = `
		display: flex;
		align-items: center;
		margin-top: 10px;
		margin-bottom: 3px;
	`;

	const cssCheckbox = document.createElement('input');
	cssCheckbox.type = 'checkbox';
	cssCheckbox.style.cssText = `
		margin-right: 10px;
		margin-top: 2px;
	`;

	const cssLabel = document.createElement('span');
	cssLabel.textContent = 'enable custom css';
	cssLabel.style.fontSize = '14px';

	const textarea = document.createElement('textarea');
	textarea.style.cssText = `
		width: 255px;
		height: 283px;
		margin-top: 10px;
		font-family: monospace !important;
		font-size: 13px;
		background: rgba(0,0,0,0.5);
		color: white;
		border: 1px solid #555555;
		padding: 10px;
		resize: none;
	`;
	textarea.placeholder = 'write css code here...';

	const textareaStyle = document.createElement('style');
	textareaStyle.innerHTML = `
		textarea::-webkit-scrollbar { width: 2px; height: 2px; }
		textarea::-webkit-scrollbar-thumb { background-color: #888888; border-radius: 10px; }
		textarea::-webkit-scrollbar-track { background-color: #333333; }
	`;
	document.head.appendChild(textareaStyle);

	cssWrapper.appendChild(cssCheckbox);
	cssWrapper.appendChild(cssLabel);
	cssContainer.appendChild(cssWrapper);
	cssContainer.appendChild(textarea);
	document.body.appendChild(cssContainer);

	cssCheckbox.checked = getStoredBool('cssCheckbox');

	function updateRealTimeCSS() {
		const customCSS = localStorage.getItem('customCSS') || '';
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

	function applyCSS() {
		const existingLink = document.querySelector('link[data-css]');
		if (existingLink) {
			existingLink.remove();
		}

		if (!cssCheckbox.checked) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://kryptonvox.netlify.app/main.css';
			link.dataset.css = 'true';
			document.head.appendChild(link);
		}

		updateRealTimeCSS();
	}

	applyCSS();

	cssCheckbox.addEventListener('change', () => {
		setStoredBool('cssCheckbox', cssCheckbox.checked);
		applyCSS();
	});

	textarea.addEventListener('input', () => {
		localStorage.setItem('customCSS', textarea.value);
		if (cssCheckbox.checked) {
			updateRealTimeCSS();
		}
	});

	const savedCustomCSS = localStorage.getItem('customCSS');
	if (savedCustomCSS) {
		textarea.value = savedCustomCSS;
		updateRealTimeCSS();
	}

	function syncDisplay(sourceElement, targetElement) {
		return new MutationObserver(() => {
			if (sourceElement.style.display === 'none') {
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

	function updateCssDropdownText() {
		cssDropdown.innerHTML = `${cssContainer.style.display === 'none' ? cssClosedIcon : cssOpenIcon} custom css`;
	}

	const cssContainerObserver = new MutationObserver(updateCssDropdownText);
	cssContainerObserver.observe(cssContainer, {
		attributes: true,
		attributeFilter: ['style'],
	});

	cssDropdown.addEventListener('click', () => {
		cssContainer.style.display = cssContainer.style.display === 'none' ? 'flex' : 'none';
	});
	updateCssDropdownText();

	function setAdvancedVisibility(isVisible) {
		form.style.display = isVisible ? 'flex' : 'none';
		xhxwrapper.style.display = isVisible ? 'flex' : 'none';
		swrapper.style.display = isVisible ? 'flex' : 'none';
		hrr6.style.display = isVisible ? 'flex' : 'none';
		cssGroup.style.display = isVisible ? 'flex' : 'none';
		dropdownWrapper.style.marginBottom = isVisible ? '12px' : '0';
		resetEverythingButton.style.marginTop = isVisible ? '8px' : '12px';
		dropdown.innerHTML = `${isVisible ? advancedOpenIcon : advancedClosedIcon} advanced`;
		setStoredBool('keybindFormVisible', isVisible);
	}

	dropdown.addEventListener('click', () => {
		setAdvancedVisibility(form.style.display !== 'flex');
	});

	setAdvancedVisibility(getStoredBool('keybindFormVisible'));
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
// --- END 04-advanced-controls.js ---

// --- BEGIN 05-skin-swapper.js ---
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

const BASIC_TEXTURE_CACHE_MAX = 24;
const basicTextureCache = new Map();
const advancedTextureCache = new Map();
const advancedTextureLoadPromises = new Map();
let advancedSkinMap = loadAdvancedSkinMap();
let swapperPatched = false;

function initSkinSwapper() {
	if (swapperPatched) {
		return;
	}

	swapperPatched = true;
	patchContext(WebGLRenderingContext);
	patchContext(window.WebGL2RenderingContext);

	if (isAdvancedSkinSwapEnabled()) {
		preloadAllAdvancedSkins();
		detectGameJoin();
	}
}

function patchContext(Context) {
	if (!Context) {
		return;
	}

	const proto = Context.prototype;
	patchMethod(proto, 'texImage2D');
	patchMethod(proto, 'texSubImage2D');
}

function patchMethod(proto, methodName) {
	const originalMethod = proto[methodName];
	if (
		typeof originalMethod !== 'function' ||
		originalMethod.__kryptonSwapperPatched
	) {
		return;
	}

	const wrappedMethod = function (...args) {
		const swappedArgs = maybeSwapSkin(args);
		return originalMethod.apply(this, swappedArgs);
	};
	wrappedMethod.__kryptonSwapperPatched = true;
	proto[methodName] = wrappedMethod;
}

function maybeSwapSkin(args) {
	const basicEnabled = getStoredBool('useDefaultSkin');
	const advancedEnabled = isAdvancedSkinSwapEnabled();
	if (!basicEnabled && !advancedEnabled) {
		return args;
	}

	const source = findImageSource(args);
	if (!source) {
		return args;
	}

	if (advancedEnabled) {
		const advancedArgs = maybeApplyAdvancedSwap(args, source);
		if (advancedArgs) {
			return advancedArgs;
		}
	}

	if (basicEnabled && source instanceof HTMLImageElement) {
		const basicTexture = maybeCreateBasicTexture(source.src);
		if (basicTexture) {
			return replaceSourceArg(args, source, basicTexture);
		}
	}

	return args;
}

function maybeApplyAdvancedSwap(args, source) {
	if (!(source instanceof HTMLImageElement)) {
		return null;
	}

	const customURL = advancedSkinMap[source.src];
	if (!customURL) {
		return null;
	}

	const replacement = advancedTextureCache.get(customURL);
	if (!replacement) {
		loadCustomSkin(customURL);
		return null;
	}

	return replaceSourceArg(args, source, replacement);
}

function maybeCreateBasicTexture(sourceUrl) {
	const skinMap = {
		[originalSkinURL1]: {
			head: localStorage.getItem('defaultHeadColor') || defaultColors.default.head,
			body: localStorage.getItem('defaultBodyColor') || defaultColors.default.body,
		},
		[originalSkinURL2]: {
			head: localStorage.getItem('rubyHeadColor') || defaultColors.ruby.head,
			body: localStorage.getItem('rubyBodyColor') || defaultColors.ruby.body,
		},
		[originalSkinURL3]: {
			head: localStorage.getItem('sapphireHeadColor') || defaultColors.sapphire.head,
			body: localStorage.getItem('sapphireBodyColor') || defaultColors.sapphire.body,
		},
	};

	if (!skinMap[sourceUrl]) {
		return null;
	}

	const { head, body } = skinMap[sourceUrl];
	const cacheKey = `${sourceUrl}|${head}|${body}`;
	const cachedTexture = basicTextureCache.get(cacheKey);
	if (cachedTexture) {
		return cachedTexture;
	}

	const texture = createGradientTexture(head, body);
	if (basicTextureCache.size >= BASIC_TEXTURE_CACHE_MAX) {
		const oldestKey = basicTextureCache.keys().next().value;
		if (oldestKey !== undefined) {
			basicTextureCache.delete(oldestKey);
		}
	}
	basicTextureCache.set(cacheKey, texture);

	return texture;
}

function replaceSourceArg(args, source, replacement) {
	return args.map((arg) => (arg === source ? replacement : arg));
}

function loadAdvancedSkinMap() {
	const parsed = getStoredJSON(
		ADVANCED_SWAP_STORAGE_KEY_MAP,
		ADVANCED_DEFAULT_SKIN_REPLACEMENTS
	);
	if (!parsed || typeof parsed !== 'object') {
		return { ...ADVANCED_DEFAULT_SKIN_REPLACEMENTS };
	}

	return {
		...ADVANCED_DEFAULT_SKIN_REPLACEMENTS,
		...parsed,
	};
}

function getAdvancedSkinMap() {
	return { ...advancedSkinMap };
}

function setAdvancedSkinMap(newMap) {
	if (!newMap || typeof newMap !== 'object') {
		return;
	}

	advancedSkinMap = {
		...ADVANCED_DEFAULT_SKIN_REPLACEMENTS,
		...newMap,
	};
	setStoredJSON(ADVANCED_SWAP_STORAGE_KEY_MAP, advancedSkinMap);
	advancedTextureCache.clear();
	advancedTextureLoadPromises.clear();

	if (isAdvancedSkinSwapEnabled()) {
		preloadAllAdvancedSkins();
	}
}

function resetAdvancedSkinMap() {
	advancedSkinMap = { ...ADVANCED_DEFAULT_SKIN_REPLACEMENTS };
	localStorage.removeItem(ADVANCED_SWAP_STORAGE_KEY_MAP);
	advancedTextureCache.clear();
	advancedTextureLoadPromises.clear();

	if (isAdvancedSkinSwapEnabled()) {
		preloadAllAdvancedSkins();
	}
}

function refreshAdvancedSkinCache() {
	advancedSkinMap = loadAdvancedSkinMap();
	advancedTextureCache.clear();
	advancedTextureLoadPromises.clear();

	if (isAdvancedSkinSwapEnabled()) {
		preloadAllAdvancedSkins();
	}
}

function setAdvancedSkinSwapEnabled(enabled) {
	setStoredBool(ADVANCED_SWAP_STORAGE_KEY_ENABLED, enabled);

	if (!enabled) {
		basicTextureCache.clear();
		advancedTextureCache.clear();
		advancedTextureLoadPromises.clear();
		return;
	}

	preloadAllAdvancedSkins();
}

function isAdvancedSkinSwapEnabled() {
	return getStoredBool(ADVANCED_SWAP_STORAGE_KEY_ENABLED, false);
}

function findImageSource(args) {
	return args.find(
		(arg) => arg instanceof HTMLImageElement || arg instanceof ImageBitmap
	);
}

function preloadAllAdvancedSkins() {
	Object.values(advancedSkinMap).forEach((url) => {
		if (typeof url === 'string' && url.trim().length > 0) {
			loadCustomSkin(url.trim());
		}
	});
}

async function loadCustomSkin(url) {
	if (advancedTextureCache.has(url)) {
		return;
	}

	const existingLoad = advancedTextureLoadPromises.get(url);
	if (existingLoad) {
		await existingLoad;
		return;
	}

	const loadPromise = (async () => {
		try {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.src = url;
			await img.decode();

			if (!isAdvancedSkinSwapEnabled()) {
				return;
			}

			if (typeof createImageBitmap === 'function') {
				const bitmap = await createImageBitmap(img);
				if (isAdvancedSkinSwapEnabled()) {
					advancedTextureCache.set(url, bitmap);
				}
				return;
			}

			if (isAdvancedSkinSwapEnabled()) {
				advancedTextureCache.set(url, img);
			}
		} catch (error) {
			console.warn('[SkinSwapper] Failed to load skin:', url, error);
		} finally {
			advancedTextureLoadPromises.delete(url);
		}
	})();

	advancedTextureLoadPromises.set(url, loadPromise);
	await loadPromise;
}

function detectGameJoin() {
	if (!isAdvancedSkinSwapEnabled()) {
		return;
	}

	const hasWebGLCanvas = () => {
		const canvases = document.getElementsByTagName('canvas');
		for (const canvas of canvases) {
			try {
				if (canvas.getContext('webgl') || canvas.getContext('webgl2')) {
					return true;
				}
			} catch {}
		}
		return false;
	};

	if (hasWebGLCanvas()) {
		preloadAllAdvancedSkins();
		return;
	}

	const observer = new MutationObserver(() => {
		if (hasWebGLCanvas()) {
			preloadAllAdvancedSkins();
			observer.disconnect();
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

window.kryptonSkinSwapper = {
	getAdvancedSkinMap,
	setAdvancedSkinMap,
	resetAdvancedSkinMap,
	refreshAdvancedSkinCache,
	setAdvancedSkinSwapEnabled,
	isAdvancedSkinSwapEnabled,
};

initSkinSwapper();
// --- END 05-skin-swapper.js ---

