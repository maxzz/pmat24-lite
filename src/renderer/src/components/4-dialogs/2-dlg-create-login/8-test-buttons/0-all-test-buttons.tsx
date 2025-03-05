import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, doDissmissNextToastsAtom } from "@/utils";
import { appSettings, debugSettings } from "@/store";
import { Checkbox, Label, RadioGroup, RadioGroupItem } from "@/ui";
import { defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";
import { testHwnd, TestHwndEnum, testMani, testScreen, type TestManiEnum, type TestScreenEnum } from "@/store/7-napi-atoms/8-create-mani-tests-w-fetch";
// import { doLoadFakeManiAtom } from "@/store/7-napi-atoms/8-create-mani-tests-w-fetch";
// import { doUpdateHwndAndIconAtom } from "../3-dlg-w-saw/0-ctx";

export function DebugButtonsForScreenshots({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2 select-none", className)} {...rest}>
            <RowScreenshots />
            <RowContent />
        </div>
    );
}

export function DebugButtonsForSaw({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { dummyCaption } = useSnapshot(debugSettings.testCreate);
    return (
        <div className={classNames("grid grid-cols-[1fr,auto] gap-1 select-none", className)} {...rest}>
            <div className="px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2">
                <RowHwns />
                <RowContent />
            </div>
            <label className="place-self-start py-1 flex items-center gap-2">
                <Checkbox className="size-4" checked={dummyCaption} onCheckedChange={(v) => debugSettings.testCreate.dummyCaption = !!v} />
                <span className="whitespace-nowrap" title="2 lines fake caption">fake caption</span>
            </label>
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

function RowHwns() {
    const { hwnd } = useSnapshot(debugSettings.testCreate);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    // const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom); // We don't need to call this, but it will update the icon and the hwnd by monitoring
    return (<>
        hwnd:
        <RadioGroup
            className="grid-cols-subgrid col-span-4"
            value={hwnd}
            onValueChange={
                (v) => {
                    debugSettings.testCreate.hwnd = v as TestHwndEnum;
                    doDissmissNextToasts();
                    // doUpdateHwndAndIcon();
                }
            }
            tabIndex={-1}
        >
            <Label className={labelClasses}> <RadioGroupItem value={testHwnd.win32} /> {testHwnd.win32} </Label>
            <Label className={labelClasses}> <RadioGroupItem value={testHwnd.web} /> {testHwnd.web} </Label>
            <Label className={labelClasses}> <RadioGroupItem value={testHwnd.none} /> {testHwnd.none} </Label>

            <DelayInput keyName={'testCreateHwndDelay'} />
        </RadioGroup>
    </>);
}

function RowContent() {
    const { mani } = useSnapshot(debugSettings.testCreate);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    // const doLoadFakeMani = useSetAtom(doLoadFakeManiAtom);
    return (<>
        content:
        <RadioGroup
            className="grid-cols-subgrid col-span-4"
            value={mani}
            onValueChange={(v) => {
                debugSettings.testCreate.mani = v as TestManiEnum;
                doDissmissNextToasts();
                // doLoadFakeMani(v as TestManiEnum); //TODO: is this wright? is returns value and not uset it but it will be used after move to the next screen.
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

type SettingsKey = keyof Pick<typeof appSettings.appUi.uiAdvanced, 'testCreateAppsDelay' | 'testCreateManiDelay' | 'testCreateHwndDelay'>;

const labelClasses = "text-[.67rem] flex items-center gap-1";
const inputClasses = "px-0.5 max-w-10 h-5 font-normal text-foreground bg-background outline-sky-500 -outline-offset-1 bordr-border border rounded";
