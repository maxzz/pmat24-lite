import { SvgSymbolAppWebChrome } from './1-app-web-chrome';
import { SvgSymbolAppWindows } from './2-app-windows';

export * from './1-app-web-chrome';
export * from './2-app-windows';

export function DefAppTypes() {
    return (<>
        {SvgSymbolAppWebChrome()}
        {SvgSymbolAppWindows()}
    </>);
}
