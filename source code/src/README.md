# Kryptonvox Source Modules

These files are concatenated in order to produce `../main.js`.

Order:
1. `00-utils.js`
2. `00-core-shell.js`
3. `01-auto-translate-toggle.js`
4. `02-chat-translator.js`
5. `03-mentions-and-reset.js`
6. `04-advanced-controls.js`
7. `05-skin-swapper.js`

Rebuild:
`powershell -ExecutionPolicy Bypass -File "source code/scripts/build-main.ps1"`
You can run this command in the default windows terminal, by going to the root directory s`Kryptonvox` in file explorer and typing cmd in the path.
After that, copy the command and press enter.

Adding a new feature:
    if you want to add a feature, first decide if it deserves its own file; if so, create a file named with the number of the script (ex. '06-new-feature'). After that, update the powerShell script(in the "scripts" folder) by adding the file in the $parts variable. You can then run the script with the provided command to update the main.js file and test your new feature.

    Remember to save the powershell script before running the command.

For any questions/issues, dm Tungstene or Nackoo on discord. Alernatively, create an issue on GitHub at github.com/Nackoo/Kryptonvox if necessary.