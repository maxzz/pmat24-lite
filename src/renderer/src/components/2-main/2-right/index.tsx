import { inputFocusClasses } from "@/ui/shared-styles";
import { LongPanel } from "./LongPanel";
import { PanelHeader } from "./0-header";

export function PanelB() {
    return (
        <div className="p-1 pl-0.5 h-full text-xs">
            <div className={`h-full`}>
                <PanelHeader />

                <div className={`h-full bg-background rounded-r-md ${inputFocusClasses} overflow-auto`} tabIndex={0}>
                    {/* <LongPanel /> */}
                </div>
            </div>
        </div>
    );
}
