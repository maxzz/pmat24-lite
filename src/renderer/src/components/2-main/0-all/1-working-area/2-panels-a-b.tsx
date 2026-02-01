import { useRef } from "react";
import { ResizableHandle, ResizableHandleToys, ResizablePanel, ResizablePanelGroup, togglePanels, toysArrowClasses, toysMiddleClasses, } from "@ui/shadcn/resizable";
import { ImperativePanelHandle, PanelGroupStorage } from "react-resizable-panels";
import { appSettings } from "@/store/9-ui-state";
import { PanelA } from "../../1-left";
import { PanelB } from "../../2-right";
import { IconChevronLeft } from "@/ui/icons";

const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.appUi.divider.positions[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.appUi.divider.positions[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};

export function ResizableABPanels() {
    const refA = useRef<ImperativePanelHandle>(null);
    const refB = useRef<ImperativePanelHandle>(null);
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full" autoSaveId="main" storage={panelsStorage}>

            <ResizablePanel ref={refA} collapsible defaultSize={33}>
                <PanelA />
            </ResizablePanel>

            <ResizableHandle className="my-0.75 pb-4 items-end z-20" tabIndex={-1}>
                <div className="flex items-center gap-1">
                    <button className={toysArrowClasses} onClick={() => togglePanels(refA, refB, true)}>
                        <IconChevronLeft />
                    </button>

                    <ResizableHandleToys className={toysMiddleClasses} />

                    <button className={toysArrowClasses} onClick={() => togglePanels(refA, refB, false)}>
                        <IconChevronLeft className="rotate-180" />
                    </button>
                </div>
            </ResizableHandle>

            <ResizablePanel ref={refB} collapsible>
                <PanelB />
            </ResizablePanel>

        </ResizablePanelGroup>
    );
}
