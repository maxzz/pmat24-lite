import { useSnapshot } from "valtio";
import { appSettings } from "@/store/9-ui-state";

export function DelayInput({ keyName }: { keyName: SettingsKey; }) {
    const value = useSnapshot(appSettings.appUi.uiAdvanced)[keyName];
    const settings = appSettings.appUi.uiAdvanced;
    return (
        <div className="ml-2 flex items-center gap-1" title="delay will be 100...10000 in ms or 1..100 in sec.">
            delay
            <input
                className={inputClasses} type="number" tabIndex={-1}
                value={value}
                onChange={(e) => settings[keyName] = +e.target.value}
            />
        </div>
    );
}

export type SettingsKey = keyof Pick<typeof appSettings.appUi.uiAdvanced, 'testCreateAppsDelay' | 'testCreateManiDelay' | 'testCreateHwndDelay'>;

export const labelClasses = "text-[.67rem] flex items-center gap-1";
export const inputClasses = "px-0.5 max-w-10 h-5 font-normal text-foreground bg-background outline-sky-500 -outline-offset-1 bordr-border border rounded";
