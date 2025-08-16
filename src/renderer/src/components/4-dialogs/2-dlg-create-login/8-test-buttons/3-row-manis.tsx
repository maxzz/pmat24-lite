import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { doDissmissNextToastsAtom } from "@/utils";
import { debugSettings } from "@/store/9-ui-state";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { testMani, type TestManiEnum } from "@/store/7-napi-atoms";
import { labelClasses, DelayInput } from "./8-utils";
// import { doLoadFakeManiAtom } from "@/store/7-napi-atoms";

export function RowManiContent() {
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
