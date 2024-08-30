import { ReactNode } from "react";
import type { SrcriptItemFld, SrcriptItemKey, SrcriptItemPos, SrcriptItemDly, ScriptItem } from "@/store";
import { PropsEditorDly } from "./panel-delay";
import { PropsEditorFld } from "./panel-field";
import { PropsEditorKey } from "./panel-key";
import { PropsEditorPos } from "./panel-pos";

export function getPropsEditor({ scriptItem, scriptItemSnap }: { scriptItem: ScriptItem; scriptItemSnap: ScriptItem; }): ReactNode {
    switch (scriptItemSnap.type) {
        case 'field': /**/ return <PropsEditorFld item={scriptItem as SrcriptItemFld} />;
        case 'key':   /**/ return <PropsEditorKey item={scriptItem as SrcriptItemKey} />;
        case 'pos':   /**/ return <PropsEditorPos item={scriptItem as SrcriptItemPos} />;
        case 'delay': /**/ return <PropsEditorDly item={scriptItem as SrcriptItemDly} />;
        default: {
            const really: never = scriptItemSnap;
            return  null;
        }
    }
}
