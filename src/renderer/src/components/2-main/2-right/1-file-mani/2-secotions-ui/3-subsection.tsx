import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";
import { LongPanel } from "../../9-nun/LongPanel";
import { AccordionMultipleProps } from "@radix-ui/react-accordion";
import { useSnapshot } from "valtio";
import { FormIdx } from "@/store/store-types";
import { FormOpenSections, formOpenSections } from "../3-sections-ui-2";

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

export function FormSections({ formIdx }: { formIdx: FormIdx; }) {
    const name = formIdx ? 'cpass' : 'login';
    const value = useSnapshot(formOpenSections)[name] as string[];
    return (
        <Accordion type="multiple" className="w-full" value={value} onValueChange={(v) => formOpenSections[name] = v}>

            <SubSection value="item-1" label="Long1">
                <LongPanel />
            </SubSection>

            <SubSection value="item-2" label="Long2">
                <LongPanel />
            </SubSection>

            <SubSection value="item-3" label="Long3">
                <LongPanel />
            </SubSection>

        </Accordion>
    );
}
