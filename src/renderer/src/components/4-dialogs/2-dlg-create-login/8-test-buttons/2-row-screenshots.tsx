import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { doDissmissNextToastsAtom } from "@/utils";
import { debugSettings } from "@/store/9-ui-state";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { defaultScreenshotWidth, doSetScreenshotsAtom, testScreen, type TestScreenEnum } from "@/store/7-napi-atoms";
import { labelClasses, DelayInput } from "./8-utils";

export function RowScreenshots() {
    const { screen } = useSnapshot(debugSettings.testCreate);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    const doSetScreenshots = useSetAtom(doSetScreenshotsAtom);
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
