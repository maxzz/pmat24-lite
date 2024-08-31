import { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { PropsEditorDly } from "../panel-delay";
import { PropsEditorFld } from "../panel-field";
import { PropsEditorKey } from "../panel-key";
import { PropsEditorPos } from "../panel-pos";

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
