import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { stateNapiBuildMani, sawHandleAtom } from "@/store";

export function SawHwndPropsGrid() {
    const sawHandle = useAtomValue(sawHandleAtom);
    const lastBuildProgress = useSnapshot(stateNapiBuildMani).lastProgress;

    return (<>
        {sawHandle && (
            <div className="relative text-xs">

                <div className="border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                    <GridRow name="caption"   /**/ value={sawHandle.caption} className="font-semibold" highlight={true} />
                    <GridRow name="classname" /**/ value={sawHandle.classname} />
                    <GridRow name="process"   /**/ value={sawHandle.process} />
                    <GridRow name="hwnd"      /**/ value={(sawHandle?.hwnd || '').replace(/^00000000/, '')} />
                </div>

                {!!lastBuildProgress && (
                    <div className="text-[.55rem] opacity-50 absolute right-2 bottom-1.5">last progress calls: {lastBuildProgress}</div>
                )}
            </div>
        )}
    </>);
}

function GridRow({ name, value, className, highlight }: { name: string; value: string; className?: string; highlight?: boolean; }) {
    return (<>
        <div className="px-2 py-1.5 h-full border-primary-500 border-b text-xs ">
            {name}
        </div>

        <div className={classNames("py-1.5 border-primary-500 border-l border-b px-2", className, highlight && value && "bg-primary-300/30")}>
            {value}
        </div>
    </>);
}
