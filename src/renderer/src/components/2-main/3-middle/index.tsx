import { ResizableHandle, ResizableHandleToys, ResizablePanel, ResizablePanelGroup, } from "@ui/shadcn/resizable";
import { appSettings } from "@/store";
import { ImperativePanelHandle, PanelGroupStorage } from "react-resizable-panels";
import { PanelA } from "../1-left";
import { PanelB } from "../2-right";
import { MutableRefObject, RefObject, useRef } from "react";
import { IconChevronLeft } from "@/ui/icons";

const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.ui.resisablesState.positions[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.ui.resisablesState.positions[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};

const toysClasses = "\
p-px \
size-4 \
invisible \
group-hover:visible \
bg-border \
outline \
outline-1 \
outline-muted-foreground/30 \
rounded-sm \
";

function panelToggle(refA: RefObject<ImperativePanelHandle>, refB: RefObject<ImperativePanelHandle>) {
    refA.current?.[refA.current.isCollapsed() ? 'expand' : 'collapse']();
};

export function MainResizable() {
    const refA = useRef<ImperativePanelHandle>(null);
    const refB = useRef<ImperativePanelHandle>(null);
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full _max-w-md r1ounded-lg b1order" autoSaveId="main" storage={panelsStorage}>

            <ResizablePanel ref={refA} collapsible defaultSize={25}>
                <PanelA />
            </ResizablePanel>

            <ResizableHandle className="group">
                <div className="flex items-center gap-1">
                    <button className={toysClasses} onClick={() => panelToggle(refA, refB)}>
                        <IconChevronLeft />
                    </button>
                    <ResizableHandleToys />
                    <button className={toysClasses} onClick={() => panelToggle(refA, refB)}>
                        <IconChevronLeft className={`${toysClasses} rotate-180`} />
                    </button>
                </div>
            </ResizableHandle>

            <ResizablePanel ref={refB} collapsible>
                <PanelB />
                {/* <ResizablePanelGroup direction="vertical" autoSaveId="sub-right" storage={panelsStorage}>

                    <ResizablePanel defaultSize={25}>
                        <PanelB />
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel defaultSize={75}>
                        <PanelC />
                    </ResizablePanel>

                </ResizablePanelGroup> */}
            </ResizablePanel>

        </ResizablePanelGroup>
    );
}

// function PanelA() {
//     return (
//         <div className="p-6 h-[200px] flex items-center justify-center">
//             <span className="font-semibold">One</span>
//         </div>
//     );
// }
// function PanelB() {
//     return (
//         <div className="p-6 h-full flex items-center justify-center">
//             <span className="font-semibold">Two</span>
//         </div>
//     );
// }
// function PanelC() {
//     return (
//         <div className="p-6 h-full flex items-center justify-center">
//             <span className="font-semibold">Three</span>
//         </div>
//     );
// }
