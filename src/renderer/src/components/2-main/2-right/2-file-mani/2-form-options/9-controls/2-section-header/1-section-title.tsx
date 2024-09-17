import { appSettings } from "@/store/app-settings";
import { useSnapshot } from "valtio";

export function SectionTitle({ label }: { label: string; }) {
    const showOptOnRight = useSnapshot(appSettings.appUi.uiGeneralState).showOptOnRight;
    return (
        <div className={`col-span-2 mt-2 first:mt-0 pr-1 text-xs font-semibold ${showOptOnRight ? 'text-end': ''} border-b border-border`}>
            {label}
        </div>
    );
}
