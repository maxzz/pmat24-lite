import { UISymbolDefsInject } from "pm-manifest-icons";
import { DefFieldTypes } from "pm-manifest-icons/src/symbols/field";
import { DefAllOtherTypes } from "./all-other";
import { DefAppTypes } from "./app";

export * from "pm-manifest-icons/src/symbols/field";
export * from "./app";
export * from "./all-other";

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefFieldTypes()}
            {DefAppTypes()}
            {DefAllOtherTypes()}
        </UISymbolDefsInject>
    );
}
