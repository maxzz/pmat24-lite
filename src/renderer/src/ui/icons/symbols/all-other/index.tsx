import { SvgSymbolFolder } from "./06-folder";
import { SvgSymbolDot } from "./08-dot";
import { SvgSymbolOpenLink } from "./09-open-link";
import { SvgSymbolCross } from "./13-cross";
import { SvgSymbolPen } from "./14-pen";
import { SvgSymbolFormLogin } from "./15-form-login";
import { SvgSymbolFormChange } from "./16-form-change";
import { SvgSymbolClassicCheck } from "./17-checkbox-classic";
import { SvgSymbolClassicCheckEmpty } from "./18-checkbox-classic-empty";
import { SvgSymbolChevronDown } from "./20-chevron-down";
import { SvgSymbolChevronUp } from "./21-chevron-up";
import { SvgSymbolChevronDoubleDown } from "./22-chevron-double-down";
import { SvgSymbolChevronRight } from "./23-chevron-right";
import { SvgSymbolFire } from "./24-fire";
import { SvgSymbolInfo } from "./24-info";
import { SvgSymbolQuestion } from "./24-question";
import { SvgSymbolWarning } from "./24-warning";
import { SvgSymbolCode } from "./25-code";
import { SvgSymbolForms } from "./25-forms";
import { SvgSymbolEllipsis } from "./26-ellipsis";

export * from "./06-folder";
export * from "./08-dot";
export * from "./09-open-link";
export * from "./13-cross";
export * from "./14-pen";
export * from "./15-form-login";
export * from "./16-form-change";
export * from "./17-checkbox-classic";
export * from "./18-checkbox-classic-empty";
export * from "./20-chevron-down";
export * from "./21-chevron-up";
export * from "./22-chevron-double-down";
export * from "./23-chevron-right";
export * from "./24-info";
export * from "./24-fire";
export * from "./24-question";
export * from "./24-warning";
export * from "./25-code";
export * from "./25-forms";
export * from "./26-ellipsis";

export function DefAllOtherTypes() {
    return (<>
        {SvgSymbolFolder()}
        {SvgSymbolDot()}
        {SvgSymbolChevronDown()}
        {SvgSymbolOpenLink()}
        {SvgSymbolCross()}
        {SvgSymbolPen()}
        {SvgSymbolFormLogin()}
        {SvgSymbolFormChange()}
        {SvgSymbolClassicCheck()}
        {SvgSymbolClassicCheckEmpty()}
        {SvgSymbolChevronUp()}
        {SvgSymbolChevronDoubleDown()}
        {SvgSymbolChevronRight()}
        {SvgSymbolFire()}
        {SvgSymbolInfo()}
        {SvgSymbolQuestion()}
        {SvgSymbolWarning()}
        {SvgSymbolCode()}
        {SvgSymbolForms()}
        {SvgSymbolEllipsis()}
    </>);
}
