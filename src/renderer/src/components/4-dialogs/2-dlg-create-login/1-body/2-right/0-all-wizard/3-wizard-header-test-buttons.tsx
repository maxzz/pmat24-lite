import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { useSnapshot } from "valtio";
import { debugState, testApp2, TestAppEnum, testScreen2, TestScreenEnum } from "@/store/state-debug";

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { screen, app } = useSnapshot(debugState.testCreate);
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

            screen:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={screen} onValueChange={(v) => debugState.testCreate.screen =v as TestScreenEnum}>
                <Label className={classNames("col-start-1", labelClasses)}> <RadioGroupItem value={testScreen2.A} /> {testScreen2.A} </Label>
                <Label className={classNames("col-start-2", labelClasses)}> <RadioGroupItem value={testScreen2.B} /> {testScreen2.B} </Label>
                <Label className={classNames("col-start-3", labelClasses)}> <RadioGroupItem value={testScreen2.none} /> {testScreen2.none} </Label>
            </RadioGroup>

            content:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={app} onValueChange={(v) => debugState.testCreate.app =v as TestAppEnum}>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.win32} /> {testApp2.win32} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.web} /> {testApp2.web} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.none} /> {testApp2.none} </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
