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
