import { type ChangeEventHandler, type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, doDissmissNextToastsAtom } from "@/utils";
import { appSettings } from "@/store";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { type TestManiEnum, type TestScreenEnum, debugSettings, doLoadFakeManiAtom, testMani, testScreen } from "@/store/1-atoms/9-ui-state";
import { defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { screen, mani } = useSnapshot(debugSettings.testCreate);

    const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
    const doLoadFakeMani = useSetAtom(doLoadFakeManiAtom);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);

    const { testCreateAppsDelay, testCreateManiDelay } = useSnapshot(appSettings.appUi.uiAdvanced);

    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

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
                }>
                <Label className={labelClasses}> <RadioGroupItem value={testScreen.A} /> {testScreen.A} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testScreen.B} /> {testScreen.B} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testScreen.none} /> {testScreen.none} </Label>

                <DelayInput value={testCreateAppsDelay} onChange={(e) => appSettings.appUi.uiAdvanced.testCreateAppsDelay = +e.target.value} />
            </RadioGroup>

            content:
            <RadioGroup
                className="grid-cols-subgrid col-span-4"
                value={mani}
                onValueChange={(v) => {
                    debugSettings.testCreate.mani = v as TestManiEnum;
                    doDissmissNextToasts();
                    doLoadFakeMani(v as TestManiEnum);
                }}
            >
                <Label className={labelClasses}> <RadioGroupItem value={testMani.win32} /> {testMani.win32} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testMani.web} /> {testMani.web} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testMani.none} /> {testMani.none} </Label>
                
                <DelayInput value={testCreateManiDelay} onChange={(e) => appSettings.appUi.uiAdvanced.testCreateManiDelay = +e.target.value} />
            </RadioGroup>

        </div>
    );
}

function DelayInput({ value, onChange }: { value: number; onChange: ChangeEventHandler<HTMLInputElement>; }) {
    return (
        <div className="ml-2 flex items-center gap-1" title="delay >= 0 and < 10000 ms.">
            delay
            <input className={inputClasses} type="number" value={value} onChange={onChange} tabIndex={-1} />
        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
const inputClasses = "px-0.5 max-w-10 font-normal outline-sky-500 -outline-offset-1";
