import { type ComponentPropsWithoutRef } from "react";
import { atom, useAtom } from "jotai";
import { classNames } from "@/utils";
import { Label, RadioGroup, RadioGroupItem } from "@/ui";
import { proxy, useSnapshot } from "valtio";

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

type TestCreateOptions= {
    screen: TestScreenEnum;
    app: TestAppEnum;
}

const testCreateOptions = proxy<TestCreateOptions>({
    screen: 'none',
    app: 'none',
})

// const testScreenAtom = atom<TestScreenEnum>('none');
// const testAppAtom = atom<TestAppEnum>('none');

export function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const { screen, app } = useSnapshot(testCreateOptions);

    // const [testScreen, setTestScreen] = useAtom(testScreenAtom);
    // const [testApp, setTestApp] = useAtom(testAppAtom);
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_auto_auto_auto] grid-rows-2 gap-x-2", className)} {...rest}>

            screen:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={screen} onValueChange={(v) => testCreateOptions.screen =v as TestScreenEnum}>
                <Label className={classNames("col-start-1", labelClasses)}> <RadioGroupItem value={testScreen2.A} /> {testScreen2.A} </Label>
                <Label className={classNames("col-start-2", labelClasses)}> <RadioGroupItem value={testScreen2.B} /> {testScreen2.B} </Label>
                <Label className={classNames("col-start-3", labelClasses)}> <RadioGroupItem value={testScreen2.none} /> {testScreen2.none} </Label>
            </RadioGroup>

            content:
            <RadioGroup className="grid-cols-subgrid col-span-3" value={app} onValueChange={(v) => testCreateOptions.app =v as TestAppEnum}>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.win32} /> {testApp2.win32} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.web} /> {testApp2.web} </Label>
                <Label className={classNames("", labelClasses)}> <RadioGroupItem value={testApp2.none} /> {testApp2.none} </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";
