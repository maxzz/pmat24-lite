import { type ComponentPropsWithoutRef } from "react";
import { atom, useAtom } from "jotai";
import { classNames } from "@/utils";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";

// const testScreens = ['none', 'A', 'B'];
// const testApps = ['none', 'win32', 'web'];

// type TestScreenEnum = 'none' | 'A' | 'B'; 
// type TestAppEnum = 'none' | 'win32' | 'web'; 

const testScreen2 = { // Test screenshots collection
    A: 'A',
    B: 'B',
    none: 'none',
};

const testApp2 = { // New manifest test content
    win32: 'win32',
    web: 'web',
    none: 'none',
};

type TestScreenEnum = keyof typeof testScreen2; // Test screenshots collection
type TestAppEnum = keyof typeof testApp2; // New manifest test content

const testScreenAtom = atom<TestScreenEnum>('none');
const testAppAtom = atom<TestAppEnum>('none');

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const [testScreen, setTestScreen] = useAtom(testScreenAtom);
    const [testApp, setTestApp] = useAtom(testAppAtom);
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

            screen:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={testScreen} onValueChange={(v) => setTestScreen(v as TestScreenEnum)}>
                <Label className={classNames("col-start-1", labelClasses)}> <RadioGroupItem value={testScreen2.A} /> {testScreen2.A} </Label>
                <Label className={classNames("col-start-2", labelClasses)}> <RadioGroupItem value={testScreen2.B} /> {testScreen2.B} </Label>
                <Label className={classNames("col-start-3", labelClasses)}> <RadioGroupItem value={testScreen2.none} /> {testScreen2.none} </Label>
            </RadioGroup>

            content:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={testApp} onValueChange={(v) => setTestApp(v as TestAppEnum)}>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.win32} /> {testApp2.win32} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.web} /> {testApp2.web} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.none} /> {testApp2.none} </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
