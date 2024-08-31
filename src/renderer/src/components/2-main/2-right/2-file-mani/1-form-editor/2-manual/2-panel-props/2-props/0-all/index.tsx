import { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { PropsEditorDly } from "../3-panel-delay";
import { PropsEditorFld } from "../1-panel-field";
import { PropsEditorKey } from "../2-panel-key";
import { PropsEditorPos } from "../4-panel-pos";

export function ScriptItemPropsEditor({ item }: { item: ManualFieldState.ForAtoms; }) {
    switch (item.type) {
        case 'fld': return <PropsEditorFld item={item} />;
        case 'kbd': return <PropsEditorKey item={item} />;
        case 'pos': return <PropsEditorPos item={item} />;
        case 'dly': return <PropsEditorDly item={item} />;
        default: {
            const really: never = item;
            return null;
        }
    }
}
