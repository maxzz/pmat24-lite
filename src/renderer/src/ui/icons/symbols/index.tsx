import { UISymbolDefsInject } from "pm-manifest-icons";
import { DefFieldTypes } from "pm-manifest-icons/src/symbols/field";
import { DefAppTypes } from "./app";

export * from "pm-manifest-icons/src/symbols/field";
export * from "./app";

export function UISymbolDefs() {
    return (
        <UISymbolDefsInject>
            {DefFieldTypes()}
            {DefAppTypes()}
        </UISymbolDefsInject>
    );
}
