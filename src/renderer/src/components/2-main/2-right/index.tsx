import { inputFocusClasses } from "@/ui/shared-styles";
import { LongPanel } from "./LongPanel";
import { PanelHeader } from "./0-header";

export const inputFocusWithinClasses = "\
focus-within::ring-primary-600 \
dark:focus-within:ring-primary-400 \
focus-within:ring-offset-primary-200 \
dark:focus-within:ring-offset-primary-800 \
focus-within:ring-1 \
focus-within:ring-offset-1 \
focus-within:outline-none";

export function PanelB() {
    return (
        <div className={`p-1 pl-0.5 h-full text-xs`}>
            <div className={`h-full ring-border ring-1 rounded-r overflow-hidden ${inputFocusWithinClasses} focus-within:ring-offset-0`}>
                <div className={`h-full bg-background flex flex-col`}>
                    <PanelHeader />
                    <div className="outline-none overflow-auto" tabIndex={0}>
                        <LongPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}
