import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { classNames } from "@/utils";
import { PanelPropsTitle } from "./1-panel-props-title";
import { editorFrameClasses, focusWithinClasses } from "../../8-shared-styles";
import { getPropsEditor } from "./2-get-panel";
import { HTMLAttributes } from "react";

function ItemPropsEditor({ ctx: ctxForm }: { ctx: MFormContextProps; }) {
    const ctx = ctxForm.formAtoms.manual;
    const chunks = useAtomValue(ctx.chunksAtom);

    const selectedRef = useAtomValue(ctx.selectedIdxStoreAtom);
    const selectedItem = chunks[selectedRef];
    if (!selectedItem) {
        return <PanelPropsTitle />;
    }

    const propsEditor = getPropsEditor({ scriptItem: selectedItem });

    return (<>
        <PanelPropsTitle type={selectedItem.type} />
        {propsEditor}
    </>);
}

const PanelPropsClasses = "\
grid grid-rows-[auto,1fr] gap-2 \
overflow-hidden \
select-none";

export function ManualPanelProps({ ctx, className, ...rest }: { ctx: MFormContextProps; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(PanelPropsClasses, editorFrameClasses, focusWithinClasses, className)} {...rest}>
            <ItemPropsEditor ctx={ctx} />
        </div>
    );
}
