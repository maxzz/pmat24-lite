import { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { PropsEditorDly } from "../3-panel-delay";
import { PropsEditorFld } from "../1-panel-field";
import { PropsEditorKey } from "../2-panel-key";
import { PropsEditorPos } from "../4-panel-pos";

export function ScriptItemPropsEditor({ ctx }: { ctx: ManualFieldState.Ctx; }) {
    switch (ctx.type) {
        case 'fld': return <PropsEditorFld item={ctx} />;
        case 'kbd': return <PropsEditorKey item={ctx} />;
        case 'pos': return <PropsEditorPos item={ctx} />;
        case 'dly': return <PropsEditorDly item={ctx} />;
        default: {
            const really: never = ctx;
            return null;
        }
    }
}
