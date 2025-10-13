import { type FileUsCtx, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { PropsEditorDly, PropsEditorFld, PropsEditorKey, PropsEditorPos } from "../2-props";

export function ScriptItemPropsEditorSelector({ ctx, fileUsCtx }: { ctx: ManualFieldState.Ctx; fileUsCtx: FileUsCtx; }) {
    switch (ctx.type) {
        case 'fld': return <PropsEditorFld item={ctx} fileUsCtx={fileUsCtx} />;
        case 'kbd': return <PropsEditorKey item={ctx} />;
        case 'pos': return <PropsEditorPos item={ctx} fileUsCtx={fileUsCtx} />;
        case 'dly': return <PropsEditorDly item={ctx} />;
        default: {
            const really: never = ctx;
            return null;
        }
    }
}
