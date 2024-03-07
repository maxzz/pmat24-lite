import { inputFocusWithinClasses } from "../2-right";
import { PanelHeader } from "./0-header";
import { DemoTreeWithOptions } from "./2-tree-demo";

export function PanelA() {
    return (
        <div className="p-1 pr-0 h-full text-xs">
            <div className={`h-full ring-border/70 ring-1 rounded-l overflow-hidden ${inputFocusWithinClasses} focus-within:ring-offset-0`}>
                <div className={`h-full bg-background flex flex-col`}>
                    <PanelHeader />
                    
                    <DemoTreeWithOptions />
                </div>
            </div>
        </div>
    );
}
//rounded-l-md ${inputFocusClasses} overflow-hidden