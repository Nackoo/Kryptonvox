(function() {
    const originalSkinURL1 = "https://voxiom.io/package/cb1d14c1ff0efb6a282b.png";
    const originalSkinURL2 = "https://voxiom.io/package/aef55bdd0c3c3c3734f8.png";
    const originalSkinURL3 = "https://voxiom.io/package/ecca1227c2e0406be225.png";

    const defaultColors = {
        default: {
            head: "#00bf63",
            body: "#ff2424"
        },
        ruby: {
            head: "#ffffff",
            body: "#ff2424"
        },
        sapphire: {
            head: "#ffffff",
            body: "#1919ff"
        }
    };

    const savedColors = {
        default: {
            head: localStorage.getItem('defaultHeadColor') || defaultColors.default.head,
            body: localStorage.getItem('defaultBodyColor') || defaultColors.default.body
        },
        ruby: {
            head: localStorage.getItem('rubyHeadColor') || defaultColors.ruby.head,
            body: localStorage.getItem('rubyBodyColor') || defaultColors.ruby.body
        },
        sapphire: {
            head: localStorage.getItem('sapphireHeadColor') || defaultColors.sapphire.head,
            body: localStorage.getItem('sapphireBodyColor') || defaultColors.sapphire.body
        }
    };

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.padding = "10px";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    container.style.display = localStorage.getItem('isContainerHidden') === 'true' ? "none" : "flex";
    container.style.flexDirection = "column";
    container.style.overflow = "auto";
    container.style.maxHeight = "555px";

    const hideText = document.createElement("span");
    hideText.style.marginBottom = "7px";
    hideText.style.fontSize = "14px";
    container.appendChild(hideText);

    function createColorPicker(savedColor, storageKey) {
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.value = savedColor;
        colorPicker.style.height = "22px";
        colorPicker.style.width = "30px";

        colorPicker.addEventListener("input", function() {
            const selectedColor = colorPicker.value;
            localStorage.setItem(storageKey, selectedColor);
        });

        return colorPicker;
    }

    const hr = document.createElement("hr");
    hr.style.marginBottom = "7px";
    hr.style.border = "1px solid white";
    container.appendChild(hr);

    const info = document.createElement("span");
    info.textContent = "head - body color"
    info.style.fontSize = "14px"
    info.style.marginBottom = "9px";
    info.style.marginTop = "3px";
    container.appendChild(info);

    const gnw = document.createElement("span");
    gnw.textContent = "V. 3 Jan 2025";
    gnw.style.fontSize = "14px";
    gnw.style.position = "absolute";
    gnw.style.right = "10px";
    gnw.style.top = "46px";
    container.appendChild(gnw);

    const ver = document.createElement("div");
    ver.innerHTML = "<span>&copy; G&W</span>";
    ver.style.fontSize = "14px";
    ver.style.position = "absolute";
    ver.style.right = "8px";
    ver.style.top = "10px";
    container.appendChild(ver);


    ["default", "ruby", "sapphire"].forEach(skin => {
        const skinWrapper = document.createElement("div");
        skinWrapper.style.display = "flex";
        skinWrapper.style.alignItems = "center";
        skinWrapper.style.marginBottom = "3px";

        const headPicker = createColorPicker(savedColors[skin].head, `${skin}HeadColor`);
        const bodyPicker = createColorPicker(savedColors[skin].body, `${skin}BodyColor`);

        bodyPicker.style.marginLeft = "3px";
        bodyPicker.style.width = "40px";
        headPicker.style.width = "40px";

        const label = document.createElement("span");
        label.textContent = `${skin.charAt(0).toUpperCase() + skin.slice(1)} Skin`;
        label.style.marginLeft = "7px";
        label.style.fontSize = "14px";
        label.style.color = "white";

        skinWrapper.appendChild(headPicker);
        skinWrapper.appendChild(bodyPicker);
        skinWrapper.appendChild(label);

        container.appendChild(skinWrapper);
    });

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.style.display = "flex";
    checkboxWrapper.style.alignItems = "center";
    checkboxWrapper.style.marginTop = "7px";

    const defaultSkinCheckbox = document.createElement("input");
    defaultSkinCheckbox.type = "checkbox";
    defaultSkinCheckbox.checked = localStorage.getItem('useDefaultSkin') === 'true';
    defaultSkinCheckbox.style.marginRight = "10px";

    const checkboxLabel = document.createElement("span");
    checkboxLabel.textContent = "Skin Swapper";
    checkboxLabel.style.fontSize = "14px";
    checkboxLabel.style.color = "white";

    checkboxWrapper.appendChild(defaultSkinCheckbox);
    checkboxWrapper.appendChild(checkboxLabel);
    container.appendChild(checkboxWrapper);

    defaultSkinCheckbox.addEventListener("change", function() {
        const isChecked = defaultSkinCheckbox.checked;
        localStorage.setItem('useDefaultSkin', isChecked ? 'true' : 'false');
    });

    document.addEventListener("DOMContentLoaded", () => {
        localStorage.setItem('useFocusMode', 'false');
        focusModeCheckbox.checked = false;
        toggleFocusMode(false);
    });

    const focusModeWrapper = document.createElement("div");
    focusModeWrapper.style.display = "flex";
    focusModeWrapper.style.alignItems = "center";

    const focusModeCheckbox = document.createElement("input");
    focusModeCheckbox.type = "checkbox";
    focusModeCheckbox.checked = false;
    focusModeCheckbox.style.marginRight = "10px";
    focusModeCheckbox.style.marginTop = "3px";

    const focusModeLabel = document.createElement("span");
    focusModeLabel.style.fontSize = "14px";
    focusModeLabel.style.marginTop = "3px";

    focusModeWrapper.appendChild(focusModeCheckbox);
    focusModeWrapper.appendChild(focusModeLabel);
    container.appendChild(focusModeWrapper);

    function toggleFocusMode(isChecked) {
        localStorage.setItem('useFocusMode', isChecked ? 'true' : 'false');

        const elementsToModify = document.querySelectorAll('.cxSTIe, .ekCLHU, .eFhDSk, .lpfJAq *, .lpdfTz *, .sc-kqnjJL');

        elementsToModify.forEach(element => {
            element.style.setProperty('visibility', isChecked ? 'hidden' : '', 'important');
        });

        const scKqnjJL = document.querySelectorAll('.sc-kqnjJL');
        scKqnjJL.forEach(element => {
            element.style.marginLeft = isChecked ? '-35px' : '';
        });
    }

    focusModeCheckbox.addEventListener("change", function() {
        toggleFocusMode(focusModeCheckbox.checked);
    });

    const DEFAULT_CHAT_HEIGHT = "147px";

    const chathWrapper = document.createElement("div");
    chathWrapper.style.display = "flex";
    chathWrapper.style.alignItems = "center";

    const chathCheckbox = document.createElement("input");
    chathCheckbox.type = "checkbox";
    chathCheckbox.checked = JSON.parse(localStorage.getItem("chathChecked") || "false");
    chathCheckbox.style.marginRight = "10px";
    chathCheckbox.style.marginTop = "3px";

    const chathLabel = document.createElement("span");
    chathLabel.style.fontSize = "14px";
    chathLabel.style.marginTop = "3px";

    const chathNumberInput = document.createElement("input");
    chathNumberInput.type = "number";
    chathNumberInput.style.width = "50px";
    chathNumberInput.style.paddingLeft = "4px";
    chathNumberInput.value = localStorage.getItem("chathHeight") || "147";
    chathNumberInput.style.marginLeft = "7px";

    const applyCustomHeight = () => {
        const elements = document.querySelectorAll(".lpfJAq *, .lpdfTz *");
        const maxHeight = chathCheckbox.checked ? chathNumberInput.value + "px" : DEFAULT_CHAT_HEIGHT;
        elements.forEach(el => (el.style.maxHeight = maxHeight));
    };

    if (chathCheckbox.checked) applyCustomHeight();

    chathCheckbox.addEventListener("change", () => {
        localStorage.setItem("chathChecked", chathCheckbox.checked);
        applyCustomHeight();
    });

    chathNumberInput.addEventListener("input", () => {
        localStorage.setItem("chathHeight", chathNumberInput.value);
        if (chathCheckbox.checked) applyCustomHeight();
    });

    const observer = new MutationObserver(() => {
        if (chathCheckbox.checked) applyCustomHeight();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    chathWrapper.appendChild(chathCheckbox);
    chathWrapper.appendChild(chathLabel);
    chathWrapper.appendChild(chathNumberInput);
    container.appendChild(chathWrapper);

    const bgsetWrapper = document.createElement("div");
    bgsetWrapper.style.display = "flex";
    bgsetWrapper.style.alignItems = "center";

    const bgsetCheckbox = document.createElement("input");
    bgsetCheckbox.type = "checkbox";
    bgsetCheckbox.checked = JSON.parse(localStorage.getItem("bgsetChecked") || "false");
    bgsetCheckbox.style.marginRight = "10px";
    bgsetCheckbox.style.marginTop = "3px";

    const bgsetLabel = document.createElement("span");
    bgsetLabel.textContent = "Enable Custom BG";
    bgsetLabel.style.fontSize = "14px";
    bgsetLabel.style.marginTop = "3px";

    bgsetWrapper.appendChild(bgsetCheckbox);
    bgsetWrapper.appendChild(bgsetLabel);
    container.appendChild(bgsetWrapper);

    const uploadWrapper = document.createElement("div");
    uploadWrapper.style.display = "flex";
    uploadWrapper.style.alignItems = "center";
    uploadWrapper.style.marginTop = "7px";

    const uploadLabel = document.createElement("span");
    uploadLabel.textContent = "Upload BG:";
    uploadLabel.style.marginRight = "5px";
    uploadLabel.style.fontSize = "14px";
    uploadLabel.style.marginTop = "2px";
    uploadLabel.style.marginBottom = "5px";

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.style.background = "none";
    urlInput.style.border = "none";
    urlInput.style.color = "white";
    urlInput.style.width = "100px";
    urlInput.style.borderBottom = "1px solid white";
    urlInput.placeholder = "Enter URL";
    urlInput.style.marginBottom = "5px";
    urlInput.style.marginRight = "10px";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.marginBottom = "5px";
    fileInput.style.width = "85px";

    fileInput.addEventListener("change", (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileType = file.type.toLowerCase();

            if (fileType.startsWith("image/") || fileType === "image/gif") {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fileURL = e.target.result;
                    urlInput.value = fileURL;
                    localStorage.setItem("backgroundURL", fileURL);

                    if (bgsetCheckbox.checked) {
                        document.querySelector(".bNczYf").style.backgroundImage = `url(${fileURL})`;
                        document.querySelector(".bNczYf").style.filter = "brightness(0.7)";
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert("You can't set this as your background lmao gtfo");
                urlInput.value = "";
                fileInput.value = "";
            }
        }
    });

    window.addEventListener("load", () => {
        const savedURL = localStorage.getItem("backgroundURL");
        const isBgsetChecked = JSON.parse(localStorage.getItem("bgsetChecked") || "false");

        if (savedURL) {
            urlInput.value = savedURL;
            if (isBgsetChecked) {
                document.querySelector(".bNczYf").style.backgroundImage = `url(${savedURL})`;
                document.querySelector(".bNczYf").style.filter = "brightness(0.7)";
            } else {
                document.querySelector(".bNczYf").style.backgroundImage = "";
                document.querySelector(".bNczYf").style.filter = "";
            }
        } else {
            document.querySelector(".bNczYf").style.backgroundImage = "";
            document.querySelector(".bNczYf").style.filter = "";
        }
    });

    bgsetCheckbox.addEventListener("change", () => {
        localStorage.setItem("bgsetChecked", bgsetCheckbox.checked);

        const savedURL = localStorage.getItem("backgroundURL");
        if (bgsetCheckbox.checked && savedURL) {
            document.querySelector(".bNczYf").style.backgroundImage = `url(${savedURL})`;
            document.querySelector(".bNczYf").style.filter = "brightness(0.7)";
        } else {
            document.querySelector(".bNczYf").style.backgroundImage = "";
            document.querySelector(".bNczYf").style.filter = "";
        }
    });

    urlInput.addEventListener("input", () => {
        const url = urlInput.value.trim();
        if (!url) {
            document.querySelector(".bNczYf").style.backgroundImage = "";
            document.querySelector(".bNczYf").style.filter = "";
            localStorage.removeItem("backgroundURL");
        }
    });

    urlInput.addEventListener("focus", () => {
        initialURLValue = urlInput.value.trim();
    });

    urlInput.addEventListener("blur", async () => {
        const url = urlInput.value.trim();

        if (url !== initialURLValue) {
            const imagePattern = /\.(gif|jpe?g|png|webp|svg|bmp|tiff|avif)$/i;

            if (imagePattern.test(url)) {
                setBackgroundImage(url);
            } else {
                try {
                    const response = await fetch(url, {
                        method: "HEAD"
                    });
                    const contentType = response.headers.get("Content-Type") || "";

                    if (contentType.startsWith("image/")) {
                        setBackgroundImage(url);
                    } else {
                        throw new Error("Invalid Content-Type");
                    }
                } catch (error) {
                    alert("You can't set this as your background lmao gtfo");
                    urlInput.value = "";
                    fileInput.value = "";
                }
            }
        }
    });

    function setBackgroundImage(url) {
        localStorage.setItem("backgroundURL", url);
        if (bgsetCheckbox.checked) {
            document.querySelector(".bNczYf").style.backgroundImage = `url(${url})`;
            document.querySelector(".bNczYf").style.filter = "brightness(0.7)";
        }
    }

    uploadWrapper.appendChild(uploadLabel);
    uploadWrapper.appendChild(urlInput);
    uploadWrapper.appendChild(fileInput);
    container.appendChild(uploadWrapper);

    const logoWrapper = document.createElement("div");
    logoWrapper.style.display = "flex";
    logoWrapper.style.alignItems = "center";

    const logoCheckbox = document.createElement("input");
    logoCheckbox.type = "checkbox";
    logoCheckbox.style.marginRight = "10px";
    logoCheckbox.style.marginTop = "3px";

    const logoLabel = document.createElement("span");
    logoLabel.textContent = "Enable Custom Logo";
    logoLabel.style.fontSize = "14px";
    logoLabel.style.marginTop = "3px";

    const logoUploadWrapper = document.createElement("div");
    logoUploadWrapper.style.display = "flex";
    logoUploadWrapper.style.alignItems = "center";
    logoUploadWrapper.style.marginTop = "3px";

    const logoUploadLabel = document.createElement("span");
    logoUploadLabel.textContent = "Upload Logo:";
    logoUploadLabel.style.marginRight = "5px";
    logoUploadLabel.style.fontSize = "14px";
    logoUploadLabel.style.marginTop = "2px";
    logoUploadLabel.style.marginBottom = "5px";

    const logoUrlInput = document.createElement("input");
    logoUrlInput.type = "text";
    logoUrlInput.style.background = "none";
    logoUrlInput.style.border = "none";
    logoUrlInput.style.color = "white";
    logoUrlInput.style.width = "90px";
    logoUrlInput.style.borderBottom = "1px solid white";
    logoUrlInput.placeholder = "Enter URL";
    logoUrlInput.style.marginBottom = "5px";
    logoUrlInput.style.marginRight = "10px";

    const logoFileInput = document.createElement("input");
    logoFileInput.type = "file";
    logoFileInput.style.marginBottom = "5px";
    logoFileInput.style.width = "85px";

    const logoHeightWrapper = document.createElement("div");
    logoHeightWrapper.style.display = "flex";
    logoHeightWrapper.style.alignItems = "center";
    logoHeightWrapper.style.marginTop = "6px";

    const logoHeightLabel = document.createElement("span");
    logoHeightLabel.textContent = "(logo) Height - Margin Top - Margin Bottom";
    logoHeightLabel.style.marginRight = "5px";
    logoHeightLabel.style.fontSize = "13px";

    const logoHeightInput = document.createElement("input");
    logoHeightInput.type = "number";
    logoHeightInput.value = 200;
    logoHeightInput.style.paddingLeft = "4px";
    logoHeightInput.style.width = "80px";
    logoHeightInput.style.marginRight = "3px";

    logoWrapper.appendChild(logoCheckbox);
    logoWrapper.appendChild(logoLabel);
    container.appendChild(logoWrapper);

    function updateLogoImage(imageSource) {
        const styleTag = document.querySelector("style.custom-logo") || document.createElement("style");
        styleTag.className = "custom-logo";
        const heightValue = logoHeightInput.value + "px";
        styleTag.textContent = `.sc-ibSMNl { content: url('${imageSource}'); height: ${heightValue}; width: auto;     filter: drop-shadow(0 0 20px black);}`;
        document.head.appendChild(styleTag);
    }

    function saveToLocalStorage() {
        const settings = {
            checkboxEnabled: logoCheckbox.checked,
            imageUrl: logoUrlInput.value,
            inputType: logoFileInput.files.length > 0 ? "file" : "url",
            heightValue: logoHeightInput.value
        };
        localStorage.setItem("customLogoSettings", JSON.stringify(settings));
    }

    function loadFromLocalStorage() {
        const settings = JSON.parse(localStorage.getItem("customLogoSettings"));
        if (settings) {
            logoCheckbox.checked = settings.checkboxEnabled;
            logoUrlInput.value = settings.imageUrl;
            logoHeightInput.value = settings.heightValue || 200;

            if (settings.checkboxEnabled) {
                updateLogoImage(settings.imageUrl);
            }
        }
    }

    function handleFileInput(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Url = e.target.result;
                logoUrlInput.value = base64Url;
                if (logoCheckbox.checked) {
                    updateLogoImage(base64Url);
                }
                saveToLocalStorage();
            };
            reader.readAsDataURL(file);
        }
    }

    // Event listeners
    logoCheckbox.addEventListener("change", () => {
        if (logoCheckbox.checked && logoUrlInput.value) {
            updateLogoImage(logoUrlInput.value);
        } else {
            const styleTag = document.querySelector("style.custom-logo");
            if (styleTag) styleTag.remove();
        }
        saveToLocalStorage();
    });

    logoUrlInput.addEventListener("input", () => {
        if (logoCheckbox.checked) {
            updateLogoImage(logoUrlInput.value);
        }
        saveToLocalStorage();
    });

    logoFileInput.addEventListener("change", handleFileInput);

    logoHeightInput.addEventListener("input", () => {
        if (logoCheckbox.checked) {
            updateLogoImage(logoUrlInput.value);
        }
        saveToLocalStorage();
    });

    loadFromLocalStorage();

    const logosWrapper = document.createElement("div");
    logosWrapper.style.display = "flex";
    logosWrapper.style.alignItems = "center";
    logosWrapper.style.marginTop = "10px";

    const logosTop = document.createElement("input");
    logosTop.type = "number";
    logosTop.style.width = "80px";
    logosTop.style.paddingLeft = "4px";
    logosTop.style.marginRight = "2.5px";
    logosTop.value = localStorage.getItem("logoMarginTop") || 50;

    const logosBottom = document.createElement("input");
    logosBottom.type = "number";
    logosBottom.style.width = "80px";
    logosBottom.style.paddingLeft = "4px";
    logosBottom.value = localStorage.getItem("logoMarginBottom") || 40;

    function updateLogoMargins() {
        const marginTop = logosTop.value || 0;
        const marginBottom = logosBottom.value || 0;

        const applyMargins = () => {
            const logoElement = document.querySelector(".sc-ibSMNl");
            if (logoElement) {
                logoElement.style.marginTop = `${marginTop}px`;
                logoElement.style.marginBottom = `${marginBottom}px`;
            } else {
                console.warn("Logo element not found. Retrying...");
                setTimeout(applyMargins, 10);
            }
        };

        applyMargins();
        localStorage.setItem("logoMarginTop", marginTop);
        localStorage.setItem("logoMarginBottom", marginBottom);
    }

    logosTop.addEventListener("input", updateLogoMargins);
    logosBottom.addEventListener("input", updateLogoMargins);

    window.addEventListener("load", () => {
        const savedMarginTop = localStorage.getItem("logoMarginTop") || 50;
        const savedMarginBottom = localStorage.getItem("logoMarginBottom") || 40;

        logosTop.value = savedMarginTop;
        logosBottom.value = savedMarginBottom;

        updateLogoMargins();
    });

    logoUploadWrapper.appendChild(logoUploadLabel);
    logoUploadWrapper.appendChild(logoUrlInput);
    logoUploadWrapper.appendChild(logoFileInput);
    container.appendChild(logoUploadWrapper);

    logoHeightWrapper.appendChild(logoHeightLabel);
    container.appendChild(logoHeightWrapper);

    logosWrapper.appendChild(logoHeightInput);
    logosWrapper.appendChild(logosTop);
    logosWrapper.appendChild(logosBottom);
    container.appendChild(logosWrapper);

    const resetEverythingButton = document.createElement("button");
    resetEverythingButton.textContent = "Restore Defaults";
    resetEverythingButton.style.padding = "3px";
    resetEverythingButton.style.cursor = "pointer";
    resetEverythingButton.style.background = "none";
    resetEverythingButton.style.border = "1px solid white";
    resetEverythingButton.style.color = "white";
    resetEverythingButton.style.fontSize = "12px";

    const defaultKeybinds = {
        focusKeybind: {
            key: 'k',
            modifier: 'alt'
        },
        chatKeybind: {
            key: 'l',
            modifier: 'alt'
        },
        containerKeybind: {
            key: 'z',
            modifier: 'alt'
        }
    };

    resetEverythingButton.addEventListener("click", function() {

        Object.keys(defaultColors).forEach(skin => {
            localStorage.setItem(`${skin}HeadColor`, defaultColors[skin].head);
            localStorage.setItem(`${skin}BodyColor`, defaultColors[skin].body);
        });

        localStorage.setItem('useFocusMode', 'false');
        toggleFocusMode(false);

        localStorage.setItem('useDefaultSkin', 'false');
        defaultSkinCheckbox.checked = false;

        localStorage.setItem("chathChecked", "false");
        localStorage.removeItem("chathHeight");
        localStorage.removeItem("logoMarginBottom");
        localStorage.removeItem("logoMarginTop");

        localStorage.setItem("bgsetChecked", "false");
        document.querySelector(".bNczYf").style.backgroundImage = "";
        document.querySelector(".bNczYf").style.filter = "";
        localStorage.removeItem("backgroundURL");
        urlInput.value = "";
        fileInput.value = "";
        bgsetCheckbox.checked = false;

        localStorage.removeItem("customLogoSettings");
        const styleTag = document.querySelector("style.custom-logo");
        if (styleTag) styleTag.remove();
        logoCheckbox.checked = false;
        logoUrlInput.value = "";

        focusKeybind = {
            ...defaultKeybinds.focusKeybind
        };
        chatKeybind = {
            ...defaultKeybinds.chatKeybind
        };
        containerKeybind = {
            ...defaultKeybinds.containerKeybind
        };

        saveKeybinds();

        location.reload();
    });

    let focusKeybind = {
        key: 'k',
        modifier: 'alt'
    };
    let chatKeybind = {
        key: 'l',
        modifier: 'alt'
    };
    let containerKeybind = {
        key: 'z',
        modifier: 'alt'
    };

    function saveKeybinds() {
        localStorage.setItem('focusKeybind', JSON.stringify(focusKeybind));
        localStorage.setItem('chatKeybind', JSON.stringify(chatKeybind));
        localStorage.setItem('containerKeybind', JSON.stringify(containerKeybind));
    }

    function loadKeybinds() {
        const savedFocusKeybind = JSON.parse(localStorage.getItem('focusKeybind'));
        const savedChatKeybind = JSON.parse(localStorage.getItem('chatKeybind'));
        const savedContainerKeybind = JSON.parse(localStorage.getItem('containerKeybind'));

        if (savedFocusKeybind) focusKeybind = savedFocusKeybind;
        if (savedChatKeybind) chatKeybind = savedChatKeybind;
        if (savedContainerKeybind) containerKeybind = savedContainerKeybind;
    }

    function updateLabels() {
        chathLabel.textContent = `Custom Chat Height (${chatKeybind.modifier} + ${chatKeybind.key.toUpperCase()})`;
        focusModeLabel.textContent = `Focus Mode (${focusKeybind.modifier} + ${focusKeybind.key.toUpperCase()})`;
        hideText.textContent = `${containerKeybind.modifier} + ${containerKeybind.key.toUpperCase()} to Hide/Show`;
    }

    function createKeybindButton(initialValue, onKeySet) {
        const button = document.createElement('button');
        button.innerText = initialValue;
        button.type = 'button';

        button.style.background = 'none';
        button.style.border = 'none';
        button.style.border = "1px solid white";
        button.style.width = '77px';
        button.style.color = "white";

        button.addEventListener('click', () => {
            button.innerText = 'Press a key';
            button.style.background = "#bf0000";
            const handleKeyPress = (event) => {
                event.preventDefault();
                button.style.background = 'none';
                const key = event.key.toLowerCase();
                button.innerText = key;
                onKeySet(key);
                saveKeybinds();
                updateLabels();
                document.removeEventListener('keydown', handleKeyPress);
            };
            document.addEventListener('keydown', handleKeyPress);
        });

        return button;
    }

    function updateEventListeners() {
        document.removeEventListener('keydown', focusKeyHandler);
        document.removeEventListener('keydown', chatKeyHandler);
        document.removeEventListener('keydown', containerKeyHandler);

        document.addEventListener('keydown', focusKeyHandler);
        document.addEventListener('keydown', chatKeyHandler);
        document.addEventListener('keydown', containerKeyHandler);
    }

    function focusKeyHandler(event) {
        const modifierCheck = focusKeybind.modifier === 'alt' ? event.altKey :
            focusKeybind.modifier === 'shift' ? event.shiftKey :
            focusKeybind.modifier === 'ctrl' ? event.ctrlKey : true;

        if (event.key.toLowerCase() === focusKeybind.key && modifierCheck) {
            const isChecked = !focusModeCheckbox.checked;
            focusModeCheckbox.checked = isChecked;
            focusModeCheckbox.dispatchEvent(new Event('change'));
        }
    }

    function chatKeyHandler(event) {
        const modifierCheck = chatKeybind.modifier === 'alt' ? event.altKey :
            chatKeybind.modifier === 'shift' ? event.shiftKey :
            chatKeybind.modifier === 'ctrl' ? event.ctrlKey : true;

        if (event.key.toLowerCase() === chatKeybind.key && modifierCheck) {
            chathCheckbox.checked = !chathCheckbox.checked;
            localStorage.setItem("chathChecked", chathCheckbox.checked);
            applyCustomHeight();
        }
    }

    // Container Keybinding
    function containerKeyHandler(event) {
        const modifierCheck = containerKeybind.modifier === 'alt' ? event.altKey :
            containerKeybind.modifier === 'shift' ? event.shiftKey :
            containerKeybind.modifier === 'ctrl' ? event.ctrlKey : true;

        if (event.key.toLowerCase() === containerKeybind.key && modifierCheck) {
            const isHidden = container.style.display === "none";
            container.style.display = isHidden ? "flex" : "none";
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
        label.style.fontSize = "13px";
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
        plusText.style.fontSize = "14px";

        const keyButton = createKeybindButton(
            keybindObject.key,
            (newKey) => {
                keybindObject.key = newKey;
                onUpdate();
            }
        );

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

        const dropdownWrapper = document.createElement("div");
        dropdownWrapper.style.display = "flex";
        dropdownWrapper.style.alignItems = "center";
        dropdownWrapper.style.marginTop = "7px";

        const dropdown = document.createElement("span");
        dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg> custom keybindings`;
        dropdown.style.fontSize = "14px";

        const dropdownHr = document.createElement("hr");
        dropdownHr.style.marginTop = "4px";
        dropdownHr.style.border = "1px solid white";
        dropdownHr.style.marginLeft = "5px";
        dropdownHr.style.width = "117px";

        dropdownWrapper.appendChild(dropdown);
        dropdownWrapper.appendChild(dropdownHr);
        container.appendChild(dropdownWrapper);

        const focusGroup = createKeybindGroup('Focus Mode', focusKeybind, updateEventListeners);
        form.appendChild(focusGroup);

        const chatGroup = createKeybindGroup('Chat Height', chatKeybind, updateEventListeners);
        form.appendChild(chatGroup);

        const containerGroup = createKeybindGroup('Container', containerKeybind, updateEventListeners);
        form.appendChild(containerGroup);

        container.appendChild(form);

        dropdown.addEventListener('click', () => {
            const isFormVisible = form.style.display === 'flex';

            form.style.display = isFormVisible ? 'none' : 'flex';

            if (form.style.display === 'flex') {
                dropdownWrapper.style.marginBottom = "12px";
                resetEverythingButton.style.marginTop = "5px";
                dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-4px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg> custom keybindings`;
            } else {
                dropdownWrapper.style.marginBottom = "0";
                resetEverythingButton.style.marginTop = "12px";
                dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-5px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg> custom keybindings`;
            }

            localStorage.setItem('keybindFormVisible', form.style.display === 'flex' ? 'true' : 'false');
        });

        const isFormVisible = localStorage.getItem('keybindFormVisible') === 'true';
        if (isFormVisible) {
            form.style.display = 'flex';
            dropdownWrapper.style.marginBottom = "12px";
            resetEverythingButton.style.marginTop = "5px";
            dropdown.innerHTML = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" style="margin-bottom:-4px" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg> custom keybindings`;
        } else {
            form.style.display = 'none';
            dropdownWrapper.style.marginBottom = "0";
            resetEverythingButton.style.marginTop = "12px";
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

        WebGLRenderingContext.prototype.texImage2D = function(...args) {
            const useDefaultSkin = localStorage.getItem('useDefaultSkin') === 'true';
            const source = args[5];

            if (!useDefaultSkin || !(source instanceof HTMLImageElement)) {
                originalTexImage2D.apply(this, args);
                return;
            }

            const skinMap = {
                [originalSkinURL1]: {
                    head: localStorage.getItem('defaultHeadColor') || defaultColors.default.head,
                    body: localStorage.getItem('defaultBodyColor') || defaultColors.default.body
                },
                [originalSkinURL2]: {
                    head: localStorage.getItem('rubyHeadColor') || defaultColors.ruby.head,
                    body: localStorage.getItem('rubyBodyColor') || defaultColors.ruby.body
                },
                [originalSkinURL3]: {
                    head: localStorage.getItem('sapphireHeadColor') || defaultColors.sapphire.head,
                    body: localStorage.getItem('sapphireBodyColor') || defaultColors.sapphire.body
                }
            };

            if (skinMap[source.src]) {
                const {
                    head,
                    body
                } = skinMap[source.src];
                const coloredTexture = createGradientTexture(head, body);
                originalTexImage2D.call(this, args[0], args[1], args[2], args[3], args[4], coloredTexture);
            } else {
                originalTexImage2D.apply(this, args);
            }
        };
    }

    function createGradientTexture(headColor, bodyColor) {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = bodyColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const headRegion = {
            x: 0,
            y: 0,
            width: canvas.width * 0.4,
            height: canvas.height * 0.4
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
})();
