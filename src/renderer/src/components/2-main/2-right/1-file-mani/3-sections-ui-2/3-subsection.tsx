import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { FormIdx } from "@/store/store-types";
import { LongPanel } from "../../9-nun/LongPanel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";
import { formOpenSections } from ".";

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
    const value = useSnapshot(formOpenSections)[formIdx];
    return (
        <Accordion type="multiple" className="w-full" value={value as string[]} onValueChange={(v) => formOpenSections[formIdx] = v}>

            <SubSection value="fields" label="Fields">
                <LongPanel />
            </SubSection>

            <SubSection value="submit" label="Submit options">
                <LongPanel />
            </SubSection>

            <SubSection value="policy" label="Policy">
                <LongPanel />
            </SubSection>

            <SubSection value="options" label="Form options">
                <LongPanel />
            </SubSection>

        </Accordion>
    );
}
