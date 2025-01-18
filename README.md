# Voxify

additional tools and styles for a better voxiom.<br>
made by Wilda, Itex, Nackoo

## features
  - skin color changer <br>
    - head color
    - body color
  - focus mode
  - custom background
  - custom chat height
  - custom logo <br>
    - custom logo size
    - custom logo margin top
    - custom logo margin buttom
  - better css 
  - custom keybinding
  - custom css
  - custom crosshair

## installation (user Javascript and CSS)
  - open `chrome://extensions/`
  - turn on `developer mode`
  - download [User Javascript and CSS](https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld) 
  - click the extension
  - click `add new`
  - paste the codes
  - fill the `URL pattern` into `https://voxiom.io/*`
  - click `save`
  - reload voxiom page

## installation (tampermonkey)
  - open `chrome://extensions/`
  - turn on `developer mode `
  - download [tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  - click the extension
  - click `add a new script`
  - add this <br>
  `// ==UserScript==`<br>
`// @name         voxiom tools`<br>
`// @namespace    http://tampermonkey.net/`<br>
`// @version      01.10.2025`<br>
`// @description  better voxiom`<br>
`// @author       Nackoo, Itex, Wilda`<br>
`// @match        *://voxiom.io/`<br>
`// @grant        none`<br>
`/ ==/UserScript==`<br>
  - paste the code
  - click `file`, and then `save`
  - reload voxiom page

## credits
- G&W
  - [discord](https://discord.gg/WxGZwXqYuW)
- voxiom
  - [discord](https://discord.gg/YExechPavq)
  - [website](https://voxiom.io)

to support auto-update feature, the code must fetch the code from a file [https://kryptonvox.netlify.app/main.js](https://kryptonvox.netlify.app/main.js) so when the developer updated the code of the file to the website, anything that fetches that file will also get updated. <br> 
to support custom css, the /main.js code must fetch the code from a file [https://kryptonvox.netlify.app/main.css](https://kryptonvox.netlify.app/main.css) so when a user wants to use their own custom css, they'll have to turn off the default style from G&W, instead of removing the style manually, the system will do it automatically. so when custom css is enabled, the default style from `/main.css` will no longer be fetched and the system will apply the custom style provided by the user to the game.
