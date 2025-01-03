# 12.26.24

* sub-folder colors from "C:\Program Files\Microsoft VS Code\resources\app\extensions\theme-defaults\themes" 

### Docs

* https://code.visualstudio.com/api/references/theme-color
* https://code.visualstudio.com/api/references/theme-color#color-theme-json-reference
* https://code.visualstudio.com/docs/getstarted/theme-color-reference

### Code

* https://github.com/microsoft/vscode/blob/main/src/vs/workbench/common/theme.ts
* https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/theme-defaults/browser/themeDefaults.ts
* https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/theme-defaults/common/themeDefaults.ts
* https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/theme-defaults/common/colorRegistry.ts

//G: 'github --vscode-editor-symbolHighlightBackground'
    * [Theme Color](https://code.visualstudio.com/api/references/theme-color)
    * [estruyf/vscode-theme-variables.css](https://gist.github.com/estruyf/ba49203e1a7d6868e9320a4ea480c27a)
    * [idleberg/vscode-theme-colors.jsonc](https://gist.github.com/idleberg/004fad51888d745ac609a24d5804050f) with color comments
    * [crcn/vscode-theme.css](https://gist.github.com/crcn/5e9d9cd935ef44df58c64c37dad32386)

//GH '--vscode-editor-symbolHighlightBackground'
//GH: 'repo:microsoft/vscode --vscode-editor-symbolHighlightBackground'

* https://github.com/microsoft/vscode/blob/main/src/vs/editor/browser/widget/codeEditor/editor.css

//G: 'vscode "Default Light+"''
    * https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/package.json
    * https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
    * https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/light_plus.json

//code
* https://github.com/microsoft/vscode/blob/main/src/vs/workbench/common/theme.ts 
    * 'export const MENUBAR_SELECTION_FOREGROUND = registerColor('menubar.selectionForeground''
    * 'export const MENUBAR_SELECTION_BACKGROUND = registerColor('menubar.selectionBackground''
    * 'export const MENUBAR_SELECTION_BORDER = registerColor('menubar.selectionBorder'''
  * https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/colorUtils.ts#L305 'export function transparent'
    * https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts#L256 'export class Color'

### Colors from DevTools

// --vscode-menu-selectionBackground: #0060c0; light
// --vscode-menu-selectionBackground: #0078d4; dark

//GH: 'repo:microsoft/vscode #0078d4'
    * https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/common/workbenchThemeService.ts#L55 
```js
      export const COLOR_THEME_DARK_INITIAL_COLORS = ...
      export const COLOR_THEME_LIGHT_INITIAL_COLORS = ...
```
  * https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_modern.json#L58
```json
      * '"menu.background": "#1F1F1F"'
      * '"menu.selectionBackground": "#0078d4"'
```
  * https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_vs.json
```json
      "menu.background": "#252526",
	  "menu.foreground": "#CCCCCC",
	  "menu.separatorBackground": "#454545",
	  "menu.border": "#454545",
	  "menu.selectionBackground": "#0078d4",
```

//GH: 'repo:microsoft/vscode #0060c0'
 * https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/colors/listColors.ts#L34

   * https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/colorUtils.ts#L236 'export function registerColor'
     * https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts#L256 'export class Color'
