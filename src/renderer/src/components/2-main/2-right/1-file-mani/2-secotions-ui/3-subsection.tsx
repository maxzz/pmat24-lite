import { ReactNode, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";
import { LongPanel } from "../../9-nun/LongPanel";

function SubSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger iconFirst leftDown className="py-2 text-mani_section-foreground/70">
                {label}
            </AccordionTrigger>

            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

export function AccordionDemo({ initialValue }: { initialValue: string[]; }) {
    const [value, setValue] = useState<string[]>(initialValue);

    function onValueChange(value: string[]) {
        console.log('AccordionDemo value changed:', value);
        setValue(value);
    }

    return (
        <Accordion type="multiple" className="w-full" value={value} onValueChange={onValueChange}>

            <SubSection value="item-1" label="Long1">
                <LongPanel />
            </SubSection>

            <SubSection value="item-2" label="Long2">
                <LongPanel />
            </SubSection>

            <SubSection value="item-3" label="Long3">
                <LongPanel />
            </SubSection>

            {/* <AccordionItem value="item-1">
                <AccordionTrigger iconFirst leftDown>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    <LongPanel />
                </AccordionContent>
            </AccordionItem> */}

            {/* <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem> */}

            {/* <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem> */}

        </Accordion>
    );
}
