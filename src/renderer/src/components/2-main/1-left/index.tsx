import { inputFocusClasses } from "@/ui/shared-styles";
import { LongPanel } from "../2-right/LongPanel";
import { DemoTreeWithOptions } from "./2-tree-demo";

export function PanelA() {
    return (
        <div className="p-1 h-full">
            <div className={`h-full rounded-l-md ${inputFocusClasses} bg-green-200/20`} tabIndex={0}>
                {/* <span className="font-semibold">One</span> */}
                {/* <LongPanel /> */}
                <DemoTreeWithOptions />
            </div>
        </div>
    );
}
