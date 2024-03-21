import { SvgSymbolAppWebChrome } from './1-app-web-chrome';
import { SvgSymbolAppWin } from './2-app-win';

export * from './1-app-web-chrome';
export * from './2-app-win';

export function DefAppTypes() {
    return (<>
        {SvgSymbolAppWebChrome()}
        {SvgSymbolAppWin()}
    </>);
}
