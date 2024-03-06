import { inputFocusClasses } from "@/ui/shared-styles";
import { LongPanel } from "./LongPanel";

export function PanelB() {
    return (
        <div className="p-1 h-full text-xs">
            <div className={`p-1 h-full bg-green-200/20 border border-l rounded-r-md ${inputFocusClasses}`} tabIndex={0}>
                <div className={`h-full overflow-auto`}>
                    {/* <LongPanel /> */}
                </div>
            </div>
        </div>
    );
}
