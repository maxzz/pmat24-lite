import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";

export function ManualFields({ ctx }: {ctx: MFormContextProps}) {
    const items = useAtomValue(ctx.formAtoms.manual.chunksAtom);
    return (<>
        <div className="grid grid-cols-2 gap-1">
            <ManualPanelActions className="h-full min-h-[20rem]" ctx={ctx} />
            <ManualPanelProps className="min-h-80 text-xs" ctx={ctx} />
        </div>
    </>);
}

//@sm/tab-content:grid-rows-2
