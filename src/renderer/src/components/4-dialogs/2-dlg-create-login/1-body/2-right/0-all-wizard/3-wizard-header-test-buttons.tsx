import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { type TestAppEnum, type TestScreenEnum, debugState, testApp, testScreen } from "@/store/state-debug";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { screen, app } = useSnapshot(debugState.testCreate);
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

            screen:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={screen} onValueChange={(v) => debugState.testCreate.screen = v as TestScreenEnum}>
                <Label className={classNames("col-start-1", labelClasses)}> <RadioGroupItem value={testScreen.A} /> {testScreen.A} </Label>
                <Label className={classNames("col-start-2", labelClasses)}> <RadioGroupItem value={testScreen.B} /> {testScreen.B} </Label>
                <Label className={classNames("col-start-3", labelClasses)}> <RadioGroupItem value={testScreen.none} /> {testScreen.none} </Label>
            </RadioGroup>

            content:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={app} onValueChange={(v) => debugState.testCreate.app = v as TestAppEnum}>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp.win32} /> {testApp.win32} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp.web} /> {testApp.web} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp.none} /> {testApp.none} </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
