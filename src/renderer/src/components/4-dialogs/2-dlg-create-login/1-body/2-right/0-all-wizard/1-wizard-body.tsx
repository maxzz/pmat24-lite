import { type ComponentPropsWithoutRef } from "react";
import { useAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { LeftPanelProgress, WizardBottomButtons } from "../../8-create-ui";
import { doOpenDrawerAtom } from "@/store";
import { PagesBody } from "./2-pages-body";
import { Button, Label, RadioGroup, RadioGroupItem } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { classNames } from "@/utils";

export function WizardBody() {
    const [doOpenDrawer, setDoOpenDrawer] = useAtom(doOpenDrawerAtom);
    return (
        <div className="h-full flex flex-col">
            <D.DialogHeader className="relative text-base font-bold border-b border-foreground/20 flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-3 text-sm">New manifest</div>
                </D.DialogTitle>

                <div className="absolute -left-[28px] -top-[14px] scale-[.72] bg-muted rounded-tl-md border border-foreground/20">
                    <DebugButtons />
                </div>

                <Button className="absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1} onClick={() => setDoOpenDrawer(false)}>
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            <div className="h-full grid grid-cols-[auto_1fr]">
                <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20 justify-center" />
                <PagesBody />
            </div>

            <WizardBottomButtons className="py-3 border-t border-foreground/20" />
        </div>
    );
}

type TestScreenEnum = 'none' | 'A' | 'B'; // Test screenshots collection
type TestAppEnum = 'none' | 'win32' | 'web'; // New manifest test content

function DebugButtons({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-2 py-0.5 text-[.67rem] grid grid-cols-[auto_1fr] grid-rows-2 gap-x-1", className)} {...rest}>

            screen:
            <RadioGroup className="flex items-center gap-x-1">
                <Label className={labelClasses}> <RadioGroupItem value="A" /> A </Label>
                <Label className={labelClasses}> <RadioGroupItem value="B" /> B </Label>
                <Label className={labelClasses}> <RadioGroupItem value="none" /> none </Label>
            </RadioGroup>

            content:
            <RadioGroup className="flex items-center gap-x-1">
                <Label className={labelClasses}> <RadioGroupItem value="win32" /> win32 </Label>
                <Label className={labelClasses}> <RadioGroupItem value="web" /> web </Label>
                <Label className={labelClasses}> <RadioGroupItem value="none" /> none </Label>
            </RadioGroup>

        </div>
    );
}

const labelClasses = "text-[.67rem] flex items-center gap-1";