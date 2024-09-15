import { SvgSymbolAppWebChrome } from "./1-app-web-chrome";
import { SvgSymbolAppWin } from "./2-app-win";
import { SvgSymbolCatalog } from "./3-app-fcat";
import { SvgSymbolAppWebIe } from "./4-app-web-ie";
import { SvgSymbolAppWebIeText } from "./5-app-web-ie-text";
import { SvgSymbolAppWebIeDot } from "./6-app-web-ie-dot";
import { SvgSymbolIconManualMode } from "./7-app-manual-mode";

export * from "./1-app-web-chrome";
export * from "./2-app-win";
export * from "./3-app-fcat";
export * from "./4-app-web-ie";
export * from "./5-app-web-ie-text";
export * from "./6-app-web-ie-dot";
export * from "./7-app-manual-mode";

export function DefAppTypes() {
    return (<>
        {SvgSymbolAppWebChrome()}
        {SvgSymbolAppWin()}
        {SvgSymbolAppWebIe()}
        {SvgSymbolAppWebIeText()}
        {SvgSymbolAppWebIeDot()}
        {SvgSymbolIconManualMode()}
        {SvgSymbolCatalog()}
    </>);
}
