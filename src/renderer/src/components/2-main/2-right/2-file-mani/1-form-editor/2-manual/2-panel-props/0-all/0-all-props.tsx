import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { PanelPropsTitle } from "./1-panel-props-title";
import { ScriptItemPropsEditorSelector } from "../2-props";
import { focusWithinClasses } from "../../8-manual-shared-styles";
import { classNames } from "@/utils";

const PanelPropsClasses = "\
grid grid-rows-[auto,1fr] gap-2 \
overflow-hidden \
select-none";

const propsBoxClasses = "px-1 flex flex-col gap-y-2";

export function ManualPanelProps({ ctx: ctxForm, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {
    const { manual: ctx, fileUsCtx } = ctxForm.mAllAtoms;
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
                <ScriptItemPropsEditorSelector ctx={selectedItem} fileUsCtx={fileUsCtx} />
            </div>

        </div>
    );
}
