import { appSettings } from "@/store";
import { useSnapshot } from "valtio";

export function SectionTitle({ label }: { label: string; }) {
    const showOptOnRight = useSnapshot(appSettings.appUi.uiGeneral).showOptOnRight;
    return (
        <div className={`col-span-2 mt-2 first:mt-0 pr-1 text-xs font-semibold ${showOptOnRight ? 'text-end': ''} border-b border-foreground/30`}>
            {label}
        </div>
    );
}
