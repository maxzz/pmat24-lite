import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { doDissmissNextToastsAtom } from "@/utils";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { testHwnd, TestHwndEnum } from "@/store/7-napi-atoms";
import { doUpdateHwndAndIconAtom } from "@/store/1-atoms/7-dialogs";
import { debugSettings } from "@/store/9-ui-state";
import { labelClasses, DelayInput } from "./8-utils";

export function RowHwns() {
    const { hwnd } = useSnapshot(debugSettings.testCreate);
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom); // We need to call this otherwise the chached value will be used
    return (<>
        hwnd:
        <RadioGroup
            className="grid-cols-subgrid col-span-4"
            value={hwnd}
            onValueChange={
                (v) => {
                    debugSettings.testCreate.hwnd = v as TestHwndEnum;
                    doDissmissNextToasts();
                    doUpdateHwndAndIcon();
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
