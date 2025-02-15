import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { type TestManiEnum, type TestScreenEnum, debugSettings, doLoadFakeManiAtom, testMani, testScreen } from "@/store/1-atoms/9-ui-state";
import { defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { screen, mani } = useSnapshot(debugSettings.testCreate);

    const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
    const doLoadFakeMani = useSetAtom(doLoadFakeManiAtom);

    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

            screen:
            <RadioGroup
                className="grid-cols-subgrid col-span-3"
                value={screen}
                onValueChange={
                    (v) => {
                        debugSettings.testCreate.screen = v as TestScreenEnum;
                        doSetScreenshots({ width: defaultScreenshotWidth });
                    }
                }>
                <Label className={labelClasses}> <RadioGroupItem value={testScreen.A} /> {testScreen.A} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testScreen.B} /> {testScreen.B} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testScreen.none} /> {testScreen.none} </Label>
            </RadioGroup>

            content:
            <RadioGroup
                className="grid-cols-subgrid col-span-3"
                value={mani}
                onValueChange={(v) => {
                    debugSettings.testCreate.mani = v as TestManiEnum;
                    doLoadFakeMani(v as TestManiEnum);
                }}
            >
                <Label className={labelClasses}> <RadioGroupItem value={testMani.win32} /> {testMani.win32} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testMani.web} /> {testMani.web} </Label>
                <Label className={labelClasses}> <RadioGroupItem value={testMani.none} /> {testMani.none} </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
