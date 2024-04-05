import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { FormIdx } from "@/store/store-types";
import { formOpenSections } from "./1-sections-state";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";

export function SubSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger iconFirst leftDown className="py-2 text-mani-title dark:text-mani-title/60">
                {label}
            </AccordionTrigger>

            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

export function FormSectionsOpenState({ formIdx, children }: { formIdx: FormIdx; children: ReactNode;}) {
    const value = useSnapshot(formOpenSections)[formIdx];
    return (
        <Accordion type="multiple" className="w-full" value={value as string[]} onValueChange={(v) => formOpenSections[formIdx] = v}>
            {children}
        </Accordion>
    );
}
