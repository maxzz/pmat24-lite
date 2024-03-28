import { HTMLAttributes } from "react";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui";
import { classNames } from "@/utils";

function MainEditor() {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 h-0">
                Mani
            </div>
        </div>
    );
}

export function Body_Mani({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { ref, width, height } = useResizeObserver();
    return (<>
        <div className={classNames("h-full w-full", className)} ref={ref} {...rest}>
            <ScrollArea style={{ width, height }} horizontal>
                <MainEditor />
            </ScrollArea>
        </div>
    </>);
}
