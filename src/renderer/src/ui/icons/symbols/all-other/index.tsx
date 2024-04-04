import { SvgSymbolDot } from "./08-dot";
import { SvgSymbolChevronDown } from "./20-chevron-down";

export * from "./08-dot";
export * from "./20-chevron-down";

export function DefAllOtherTypes() {
    
    return (<>
        {SvgSymbolDot()}
        {SvgSymbolChevronDown()}
    </>);
}
