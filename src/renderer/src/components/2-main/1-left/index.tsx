import { PanelHeader } from "./0-header";
import { DemoTreeWithOptions } from "./2-tree-demo";

export function PanelA() {
    return (
        <div className="p-1 pr-0.5 h-full">
            <div className={`h-full rounded-l-md bg-background`}>
                <PanelHeader />
                
                <DemoTreeWithOptions />
            </div>
        </div>
    );
}
