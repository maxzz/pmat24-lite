import { SvgSymbolAppWebChrome } from './1-app-web-chrome';
import { SvgSymbolAppWin } from './2-app-win';
import { SvgSymbolCatalog } from './3-app-fcat';

export * from './1-app-web-chrome';
export * from './2-app-win';
export * from './3-app-fcat';

export function DefAppTypes() {
    return (<>
        {SvgSymbolAppWebChrome()}
        {SvgSymbolAppWin()}
        {SvgSymbolCatalog()}
    </>);
}
