import { FileUs } from "@/store/store-types";
import { SubSectionAccordion } from "../2-secotions-ui";
import { LongPanel } from "../../9-nun/LongPanel";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];
    return (
        <div className="flex flex-col">
            Form {title}

            <div>
                {formMeta?.disp?.domain}

                <SubSectionAccordion label="Form" openKey="fields">
                    <div className="w-96">
                        111
                    </div>
                </SubSectionAccordion>

                <SubSectionAccordion label="Form" openKey="options">
                    <div className="w-96">
                        111
                    </div>
                </SubSectionAccordion>

                <AccordionDemo initialValue={!formIdx ? ["item-1"]:["item-2", "item-3"]} />
            </div>

            <LongPanel />
        </div>
    );
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui/shadcn/accordion";
import * as Prim from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from "react";
import { cn } from "@/utils";

const AccordionTriggerClasses = "\
flex-1 py-4 text-sm font-medium \
hover:underline \
[&>svg]:-rotate-90 \
[&[data-state=open]>svg]:rotate-0 \
transition-all \
flex items-center justify-start";

// const AccordionTrigger = forwardRef<ElementRef<typeof Prim.Trigger>, ComponentPropsWithoutRef<typeof Prim.Trigger>>(
//     ({ className, children, ...rest }, ref) => (
//         <Prim.Header className="flex">
//             <Prim.Trigger ref={ref} className={cn(AccordionTriggerClasses, className)} {...rest}>
//                 <ChevronDownIcon className="shrink-0 size-4 text-muted-foreground transition-transform duration-200" />
//                 <div>{children}</div>
//             </Prim.Trigger>
//         </Prim.Header>
//     )
// );

export function AccordionDemo({initialValue}: {initialValue: string[]}) {
    const [value, setValue] = useState<string[]>(initialValue);
    function onValueChange(value: string[]) {
        console.log('AccordionDemo value changed:', value);
        setValue(value);
    }
    return (
        <Accordion type="multiple" className="w-full" value={value} onValueChange={onValueChange}>

            <AccordionItem value="item-1">
                <AccordionTrigger iconFirst leftDown>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}
