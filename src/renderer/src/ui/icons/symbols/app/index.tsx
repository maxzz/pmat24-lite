import { SvgSymbolAppWebChrome } from "./1-app-web-chrome";
import { SvgSymbolAppWin } from "./2-app-win";
import { SvgSymbolCatalog } from "./3-app-fcat";
import { SvgSymbolAppWebIe } from "./4-app-web-ie";
import { SvgSymbolAppWebIeText } from "./5-app-web-ie-text";
import { SvgSymbolIconManualMode } from "./7-app-manual-mode";

export * from "./1-app-web-chrome";
export * from "./2-app-win";
export * from "./3-app-fcat";
export * from "./7-app-manual-mode";

export function DefAppTypes() {
    return (<>
        {SvgSymbolAppWebChrome()}
        {SvgSymbolAppWin()}
        {SvgSymbolCatalog()}
        {SvgSymbolAppWebIe()}
        {SvgSymbolAppWebIeText()}
        {SvgSymbolIconManualMode()}
    </>);
}
