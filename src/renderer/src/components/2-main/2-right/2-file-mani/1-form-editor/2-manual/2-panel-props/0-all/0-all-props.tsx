import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { PanelPropsTitle } from "./1-panel-props-title";
import { ScriptItemPropsEditor } from "../2-props";
import { editorFrameClasses, focusWithinClasses } from "../../8-manual-shared-styles";
import { classNames } from "@/utils";
import { propsBoxClasses } from "../8-manual-props-ui";

const PanelPropsClasses = "\
grid grid-rows-[auto,1fr] gap-2 \
overflow-hidden \
select-none";

export function ManualPanelProps({ ctx: ctxForm, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {
    const ctx = ctxForm.mAllAtoms.manual;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectedRef = useAtomValue(ctx.selectedIdxStoreAtom);
    const selectedItem = chunks[selectedRef];
    if (!selectedItem) {
        return null;
    }

    return (
        <div className={classNames(PanelPropsClasses, editorFrameClasses, focusWithinClasses, className)} {...rest}>

            <PanelPropsTitle type={selectedItem.type} />

            <div className={propsBoxClasses} {...rest}>
                <ScriptItemPropsEditor ctx={selectedItem} />
            </div>

        </div>
    );
}
