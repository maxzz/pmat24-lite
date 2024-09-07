import { useAtomValue } from "jotai";
import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";

export function ManualFields({ ctx }: {ctx: MFormContextProps}) {
    const items = useAtomValue(ctx.formAtoms.manual.chunksAtom);
    return (<>
        <div className="pl-0.5 pr-2.5 min-w-60 grid grid-cols-1 @[600px]:grid-cols-2 gap-1">
            <ManualPanelActions className="@container/actions h-full min-h-[20rem]" ctx={ctx} />
            <ManualPanelProps className="@container/props min-h-[340px] text-xs" ctx={ctx} />
        </div>
    </>);
}

//TODO: check focus-within when added new item from the empty list
