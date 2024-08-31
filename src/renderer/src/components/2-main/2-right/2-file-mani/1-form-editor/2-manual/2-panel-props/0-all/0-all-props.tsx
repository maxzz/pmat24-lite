import { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { PanelPropsTitle } from "./1-panel-props-title";
import { ScriptItemPropsEditor } from "../2-props";
import { editorFrameClasses, focusWithinClasses } from "../../8-shared-styles";
import { classNames } from "@/utils";

const PanelPropsClasses = "\
grid grid-rows-[auto,1fr] gap-2 \
overflow-hidden \
select-none";

export function ManualPanelProps({ ctx: ctxForm, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {
    const ctx = ctxForm.formAtoms.manual;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectedRef = useAtomValue(ctx.selectedIdxStoreAtom);
    const selectedItem = chunks[selectedRef];
    if (!selectedItem) {
        return <PanelPropsTitle />;
    }

    return (
        <div className={classNames(PanelPropsClasses, editorFrameClasses, focusWithinClasses, className)} {...rest}>

            <PanelPropsTitle type={selectedItem.type} />
            <ScriptItemPropsEditor item={selectedItem} />
            
        </div>
    );
}
