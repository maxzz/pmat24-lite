import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type MFormProps, type FileUsCtx, type ManualFieldState } from "@/store/2-file-mani-atoms";
import { PanelPropsTitle } from "./1-panel-props-title";
import { focusWithinClasses } from "../../8-manual-shared-styles";
import { PropsEditorDly, PropsEditorFld, PropsEditorKey, PropsEditorPos } from "../2-props";

export function ManualPanelProps({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & HTMLAttributes<HTMLDivElement>) {
    const { manual: ctx, fileUsCtx } = mFormProps.mFormCtx;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectedRef = useAtomValue(ctx.selectedIdxStoreAtom);
    const selectedItem = chunks[selectedRef];
    if (!selectedItem) {
        return null;
    }

    return (
        <div className={classNames(PanelPropsClasses, "p-1 border-border border rounded", focusWithinClasses, className)} {...rest}>

            <PanelPropsTitle type={selectedItem.type} />

            <div className={propsBoxClasses} {...rest}>
                <PropsEditorSelector ctx={selectedItem} fileUsCtx={fileUsCtx} />
            </div>

        </div>
    );
}

const PanelPropsClasses = "\
grid grid-rows-[auto_1fr] gap-2 \
overflow-hidden \
select-none";

const propsBoxClasses = "px-1 flex flex-col gap-y-2";

function PropsEditorSelector({ ctx, fileUsCtx }: { ctx: ManualFieldState.Ctx; fileUsCtx: FileUsCtx; }) {
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
