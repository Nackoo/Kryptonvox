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
