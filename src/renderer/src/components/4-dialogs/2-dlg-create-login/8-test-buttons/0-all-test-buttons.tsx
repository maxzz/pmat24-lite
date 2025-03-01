import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, doDissmissNextToastsAtom } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { doLoadFakeManiAtom, testMani, testScreen, type TestManiEnum, type TestScreenEnum } from "@/store/7-napi-atoms/8-create-mani-tests-w-fetch";
import { defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";

export function DebugButtonsForScreenshots({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>
            <RowScreenshots />
            <RowContent />
        </div>
    );
}

function RowScreenshots() {
    const { screen } = useSnapshot(debugSettings.testCreate);
    const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    return (<>
        screen:
        <RadioGroup
            className="grid-cols-subgrid col-span-4"
            value={screen}
            onValueChange={
                (v) => {
                    debugSettings.testCreate.screen = v as TestScreenEnum;
                    doDissmissNextToasts();
                    doSetScreenshots({ width: defaultScreenshotWidth });
                }
            }
            tabIndex={-1}
        >
            <Label className={labelClasses}> <RadioGroupItem value={testScreen.A} /> {testScreen.A} </Label>
            <Label className={labelClasses}> <RadioGroupItem value={testScreen.B} /> {testScreen.B} </Label>
            <Label className={labelClasses}> <RadioGroupItem value={testScreen.none} /> {testScreen.none} </Label>

            <DelayInput keyName={'testCreateAppsDelay'} />
        </RadioGroup>
    </>);
}

function RowContent() {
    const { mani } = useSnapshot(debugSettings.testCreate);
    const doLoadFakeMani = useSetAtom(doLoadFakeManiAtom);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    return (<>
            content:
            <RadioGroup
                className="grid-cols-subgrid col-span-4"
                value={mani}
                onValueChange={(v) => {
                    debugSettings.testCreate.mani = v as TestManiEnum;
                    doDissmissNextToasts();
                    doLoadFakeMani(v as TestManiEnum); //TODO: is this wright? is returns value and not uset it but it will be used after move to the next screen.
                }}
                tabIndex={-1}
            >
                <Label className={labelClasses}> <RadioGroupItem value={testMani.win32} /> {testMani.win32} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testMani.web} /> {testMani.web} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testMani.none} /> {testMani.none} </Label>

                <DelayInput keyName={'testCreateManiDelay'} />
            </RadioGroup>
    </>);
}

function DelayInput({ keyName }: { keyName: SettingsKey; }) {
    const value = useSnapshot(appSettings.appUi.uiAdvanced)[keyName];
    const settings = appSettings.appUi.uiAdvanced;
    return (
        <div
            className="ml-2 flex items-center gap-1" title="delay will be 100...10000 in ms or 1..100 in sec.">
            delay
            <input className={inputClasses} type="number" tabIndex={-1} value={value} onChange={(e) => settings[keyName] = +e.target.value} />
        </div>
    );
}

type SettingsKey = keyof Pick<typeof appSettings.appUi.uiAdvanced, 'testCreateAppsDelay' | 'testCreateManiDelay'>;

const labelClasses = "text-[.67rem] flex items-center gap-1";
const inputClasses = "px-0.5 max-w-10 h-5 font-normal text-foreground bg-background outline-sky-500 -outline-offset-1 bordr-border border rounded";
