import { type ComponentPropsWithoutRef } from "react";
import { atom, useAtom } from "jotai";
import { classNames } from "@/utils";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";

type TestScreenEnum = 'none' | 'A' | 'B'; // Test screenshots collection
type TestAppEnum = 'none' | 'win32' | 'web'; // New manifest test content

const testScreenAtom = atom<TestScreenEnum>('none');
const testAppAtom = atom<TestAppEnum>('none');

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const [testScreen, setTestScreen] = useAtom(testScreenAtom);
    const [testApp, setTestApp] = useAtom(testAppAtom);
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

            screen:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={testScreen} onValueChange={(v) => setTestScreen(v as TestScreenEnum)}>
                <Label className={classNames("col-start-1", labelClasses)}> <RadioGroupItem value="A" /> A </Label>
                <Label className={classNames("col-start-2", labelClasses)}> <RadioGroupItem value="B" /> B </Label>
                <Label className={classNames("col-start-3", labelClasses)}> <RadioGroupItem value="none" /> none </Label>
            </RadioGroup>

            content:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={testApp} onValueChange={(v) => setTestApp(v as TestAppEnum)}>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value="win32" /> win32 </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value="web" /> web </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value="none" /> none </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
