# Voxify

additional tools for a better voxiom.<br>
made by Wilda, Itex, Nackoo

## features
  - skin color changer
    - head color
    - body color
  - focus mode 
  - custom keybinding
  - better css
  - custom css
  - custom crosshair
  - auto-translate

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
`// @name         voxify`<br>
`// @namespace    http://tampermonkey.net/`<br>
`// @version      03.22.2025`<br>
`// @description  krypton`<br>
`// @author       Nackoo, Itex, Wilda`<br>
`// @match        *://voxiom.io/`<br>
`// @grant        none`<br>
`// ==/UserScript==`<br>
  - paste the code
  - click `file`, and then `save`
  - reload voxiom page

## credits
- G&W
  - [discord](https://discord.gg/WxGZwXqYuW)
- voxiom
  - [discord](https://discord.gg/YExechPavq)
  - [website](https://voxiom.io)

to support auto-update feature, the code must fetch the code from a file [https://kryptonvox.netlify.app/main.js](https://kryptonvox.netlify.app/main.js) so when the developer updated the code of the file to the website, anything that fetches that file will also get updated.
