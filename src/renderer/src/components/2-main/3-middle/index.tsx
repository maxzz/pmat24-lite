import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@ui/shadcn/resizable";
import { appSettings } from "@/store";
import { PanelGroupStorage } from "react-resizable-panels";
import { PanelA } from "../1-left";
import { PanelB } from "../2-right";

const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.ui.resisablesState.positions[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.ui.resisablesState.positions[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};

export function MainResizable() {
    return (
        <ResizablePanelGroup direction="horizontal" className="w-full _max-w-md r1ounded-lg b1order" autoSaveId="main" storage={panelsStorage}>

            <ResizablePanel defaultSize={25}>
                <PanelA />
            </ResizablePanel>

            {/* <ResizableHandle withHandle /> */}
            <ResizableHandle />

            <ResizablePanel>
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
