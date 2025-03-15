import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, doDissmissNextToastsAtom } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import { Checkbox, Label, RadioGroup, RadioGroupItem } from "@/ui";
import { defaultScreenshotWidth, doSetScreenshotsAtom, testHwnd, TestHwndEnum, testMani, testScreen, type TestManiEnum, type TestScreenEnum } from "@/store/7-napi-atoms";
import { doUpdateHwndAndIconAtom } from "../3-dlg-w-saw/0-ctx";
// import { doLoadFakeManiAtom } from "@/store/7-napi-atoms";

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
