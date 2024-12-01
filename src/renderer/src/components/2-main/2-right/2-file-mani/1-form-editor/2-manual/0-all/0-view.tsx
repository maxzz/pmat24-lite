import { type MFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";
import { Scroll } from "lucide-react";
import { ScrollArea } from "@/ui";

const manualModeViewClasses = "\
pl-0.5 min-w-60 h-full 1bg-green-400 \
\
grid grid-cols-1 grid-rows-[minmax(100px,_1fr),auto] min-h-0 \
@[600px]:grid-cols-2 \
gap-1 \
";

export function ManualModeView({ ctx }: { ctx: MFormContextProps; }) {
    return (<>
        <div className={manualModeViewClasses}>
            <ManualPanelActions className="@container/actions" ctx={ctx} />
            <ManualPanelProps className="@container/props min-h-[210px] text-xs" ctx={ctx} />
        </div>
    </>);
}

//TODO: check focus-within when added new item from the empty list

//TODO: remove frame; leave only line inbetween
//TODO: scroll panels independently
//TDOO: header is not part of the scroll
