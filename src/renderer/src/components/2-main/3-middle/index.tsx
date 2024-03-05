import { useRef } from "react";
import { ResizableHandle, ResizableHandleToys, ResizablePanel, ResizablePanelGroup, togglePanels, toysArrowClasses, toysMiddleClasses, } from "@ui/shadcn/resizable";
import { appSettings } from "@/store";
import { ImperativePanelHandle, PanelGroupStorage } from "react-resizable-panels";
import { PanelA } from "../1-left";
import { PanelB } from "../2-right";
import { IconChevronLeft } from "@/ui/icons";

const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.ui.resisablesState.positions[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.ui.resisablesState.positions[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};

export function MainResizable() {
    const refA = useRef<ImperativePanelHandle>(null);
    const refB = useRef<ImperativePanelHandle>(null);
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full _max-w-md r1ounded-lg b1order" autoSaveId="main" storage={panelsStorage}>

            <ResizablePanel ref={refA} collapsible defaultSize={25}>
                <PanelA />
            </ResizablePanel>

            <ResizableHandle className="pb-2 items-end">
                <div className="flex items-center gap-1">
                    <button className={toysArrowClasses} onClick={() => togglePanels(refA, refB, true)}>
                        <IconChevronLeft />
                    </button>

                    <ResizableHandleToys className={toysMiddleClasses} />

                    <button className={toysArrowClasses} onClick={() => togglePanels(refA, refB, false)}>
                        <IconChevronLeft className={`${toysArrowClasses} rotate-180`} />
                    </button>
                </div>
            </ResizableHandle>

            <ResizablePanel ref={refB} collapsible>
                <PanelB />
            </ResizablePanel>

        </ResizablePanelGroup>
    );
}
