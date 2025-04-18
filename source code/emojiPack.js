function createEmojiInstructions() {
    const a = document.createElement('div');
    a.id = 'emoji-instructions';
    a.innerHTML = `
    <style>
    m {
    	background: #21262d;
  		padding: 2px 5px;
  		border-radius: 5px;
  		border: 1px solid grey;
    }
    #emoji-instructions {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #161b22;
      border-radius: 7px;
      color: #f0f0f0;
      width: 444px;
      border: 1px solid grey;
      overflow: auto;
      max-height: 500px;
      padding: 20px;
      line-height: 2;
      display: block;
    }
    </style>
    
Ctrl + Q) emoji list:<br>
    <m>:1:</m> Cute <img src="https://i.imgur.com/brZJSAn.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:2:</m> Freaky Stare <img src="https://i.imgur.com/qoIoug8.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:3:</m> Face Hearts <img src="https://i.imgur.com/FuEcXz6.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:4:</m> Sad <img src="https://i.imgur.com/v3sPlIT.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:5:</m> Disappointed Cry <img src="https://i.imgur.com/FZahPU7.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:6:</m> Biting Lips <img src="https://i.imgur.com/hoFxCIE.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:7:</m> What the Hell <img src="https://i.imgur.com/jb9VzQD.gif" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:8:</m> Squirrel Hammer <img src="https://i.imgur.com/AkrJcv7.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:9:</m> Annoyed <img src="https://i.imgur.com/AfnJTcz.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:10:</m> Woah Face <img src="https://i.imgur.com/ENk7IzR.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:11:</m> Silly Laugh <img src="https://i.imgur.com/ZgZuQJL.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:12:</m> Kiss <img src="https://i.imgur.com/bWoL9im.png" style="height:20px; width:auto; margin-bottom:-5px;"><br>
    <m>:13:</m> Blush <img src="https://i.imgur.com/d81B1dw.png" style="height:20px; width:auto; margin-bottom:-5px;">
    `;
    document.body.appendChild(a);
    
    const displayState = localStorage.getItem('emojiInstructionsVisible') === 'true';
    a.style.display = displayState ? 'block' : 'none';
}

function toggleEmojiInstructions(e) {
    if (e.ctrlKey && e.key === 'q') {
        const a = document.getElementById('emoji-instructions');
        const isVisible = a.style.display === 'block';
        a.style.display = isVisible ? 'none' : 'block';

        localStorage.setItem('emojiInstructionsVisible', !isVisible);
    }
}

document.addEventListener('keydown', toggleEmojiInstructions);
createEmojiInstructions();

function replaceCustomEmojis() {
    const emojiMap = {
        ":1:": "https://i.imgur.com/brZJSAn.png", //cute
        ":2:": "https://i.imgur.com/qoIoug8.png", //freaky stare
        ":3:": "https://i.imgur.com/FuEcXz6.png", //face hearts
        ":4:": "https://i.imgur.com/v3sPlIT.png", //sad
        ":5:": "https://i.imgur.com/FZahPU7.png", //disappointed cry
        ":6:": "https://i.imgur.com/hoFxCIE.png", //biting lips
        ":7:": "https://i.imgur.com/jb9VzQD.gif", //whatdehel
        ":8:": "https://i.imgur.com/AkrJcv7.png", //squirrel hammer
        ":9:": "https://i.imgur.com/AfnJTcz.png", //annoyed
        ":10:": "https://i.imgur.com/ENk7IzR.png", //woah face
        ":11:": "https://i.imgur.com/ZgZuQJL.png", //silli laugh
        ":12:": "https://i.imgur.com/bWoL9im.png", //kiss
        ":13:": "https://i.imgur.com/d81B1dw.png", //blush
    };

    document.querySelectorAll('.sc-wkwDy.gTfPhn > span:last-child').forEach(span => {
        let content = span.innerHTML.trim();

        if (!Object.keys(emojiMap).some(e => content.includes(e))) return;

        let newContent = content;

        Object.entries(emojiMap).forEach(([emoji, url]) => {
            const emojiOnlyPattern = new RegExp(`^: ?${emoji}$`);
            const inlinePattern = new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

            if (emojiOnlyPattern.test(content)) {
                newContent = `: <img src="${url}" style="height:35px;width:auto;margin-bottom:-5px;">`;
            } 
            else {
                newContent = newContent.replace(inlinePattern, `<img src="${url}" style="height:20px;width:auto;margin-bottom:-5px;">`);
            }
        });

        span.innerHTML = newContent;
    });
}

replaceCustomEmojis();

const observer = new MutationObserver(() => {
    replaceCustomEmojis(); 
});

observer.observe(document.body, { childList: true, subtree: true });
