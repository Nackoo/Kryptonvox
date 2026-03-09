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

