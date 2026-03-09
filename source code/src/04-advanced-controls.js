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
