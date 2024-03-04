import { useAtomValue } from "jotai";
import { lastBuildProgressAtom, sawHandleAtom } from "@/store";
import { classNames } from "@/utils";

function GridRow({ name, value, className, highlight }: { name: string; value: string; className?: string; highlight?: boolean; }) {
    return (<>
        <div className="px-2 py-1.5 h-full border-primary-500 border-b text-xs ">{name}</div>
        <div className={classNames("py-1.5 border-primary-500 border-l border-b px-2", className, highlight && value && "bg-primary-300/30")}>{value}</div>
    </>);
}

export function PanelHwndGrid() {
    const secondActiveWindow = useAtomValue(sawHandleAtom);
    const lastBuildProgress = useAtomValue(lastBuildProgressAtom);
    return (<>
        {secondActiveWindow && (
            <div className="relative text-xs">
                <div className="border-primary-500 border rounded grid grid-cols-[auto_1fr]">
                    <GridRow name="caption"   /**/ value={secondActiveWindow.caption} className="font-semibold" highlight={true} />
                    <GridRow name="classname" /**/ value={secondActiveWindow.classname} />
                    <GridRow name="process"   /**/ value={secondActiveWindow.process} />
                    <GridRow name="hwnd"      /**/ value={(secondActiveWindow?.hwnd || '').replace(/^00000000/, '')} />
                </div>
                {!!lastBuildProgress &&
                    <div className="text-[.55rem] opacity-50 absolute right-2 bottom-1.5">last progress calls: {lastBuildProgress}</div>
                }
            </div>
        )}
    </>);
}
