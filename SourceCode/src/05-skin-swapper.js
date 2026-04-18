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
