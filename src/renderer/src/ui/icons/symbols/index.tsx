import { UISymbolDefsInject } from "pm-manifest-icons";
import { DefFieldTypes } from "pm-manifest-icons/src/symbols/fields";
import { DefAppTypes } from "./app";
import { DefAllOtherTypes } from "./all-other";

export * from "pm-manifest-icons/src/symbols/fields";
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
