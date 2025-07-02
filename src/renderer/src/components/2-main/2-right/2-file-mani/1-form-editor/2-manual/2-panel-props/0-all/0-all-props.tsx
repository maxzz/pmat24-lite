import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type MFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { PanelPropsTitle } from "./1-panel-props-title";
import { ScriptItemPropsEditorSelector } from "../2-props";
import { focusWithinClasses } from "../../8-manual-shared-styles";
import { classNames } from "@/utils";

export function ManualPanelProps({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & HTMLAttributes<HTMLDivElement>) {
    const { manual: ctx, fileUsCtx } = mFormProps.mFormCtx;
    const chunks = useAtomValue(ctx.chunksAtom);

    console.log(`%c✴ ManualPanelProps1:`, 'color: magenta', mFormProps);

    const selectedRef = useAtomValue(ctx.selectedIdxStoreAtom);
    const selectedItem = chunks[selectedRef];
    if (!selectedItem) {
        return null;
    }

    console.log(`%c✴ ManualPanelProps2:`, 'color: magenta', mFormProps);

    return (
        <div className={classNames(PanelPropsClasses, "p-1 border-border border rounded", focusWithinClasses, className)} {...rest}>

            <PanelPropsTitle type={selectedItem.type} />

            <div className={propsBoxClasses} {...rest}>
                <ScriptItemPropsEditorSelector ctx={selectedItem} fileUsCtx={fileUsCtx} />
            </div>

        </div>
    );
}

const PanelPropsClasses = "\
grid grid-rows-[auto,1fr] gap-2 \
overflow-hidden \
select-none";

const propsBoxClasses = "px-1 flex flex-col gap-y-2";
