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
	popup.innerHTML = `<svg style="color:#faa61a;margin-bottom:-7px;margin-right:3px;" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z"/><path fill-rule="evenodd" d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z" clip-rule="evenodd"/><path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z"/></svg><span class="mention-name"></span> mentioned you`;
	const nameSpan = popup.querySelector('.mention-name');
	if (nameSpan) {
		nameSpan.textContent = name;
		nameSpan.style.color = '#04ff6c';
	}
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
		key: 'w',
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

	trCheckbox.checked = false;
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
	key: 'w',
	modifier: 'alt',
};