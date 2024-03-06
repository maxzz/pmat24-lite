import { inputFocusClasses } from "@/ui/shared-styles";
import { LongPanel } from "./LongPanel";

export function PanelB() {
    return (
        <div className="p-1 pl-0.5 h-full text-xs">
            <div className={`p-1 h-full bg-background rounded-r-md ${inputFocusClasses}`} tabIndex={0}>
                <div className={`h-full overflow-auto`}>
                    {/* <LongPanel /> */}
                </div>
            </div>
        </div>
    );
}
