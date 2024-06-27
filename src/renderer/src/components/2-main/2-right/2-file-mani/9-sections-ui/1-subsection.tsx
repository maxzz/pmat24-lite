import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { FormIdx } from "@/store/store-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";

export function SubSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value} className="border-none">
            <div className="inline-block">
                <AccordionTrigger leftDown className="p-2 pb-0 text-mani-title outline-none focus:underline">
                    {label}
                </AccordionTrigger>
            </div>

            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

export function FormSectionsAccordion({ formIdx, children }: { formIdx: FormIdx; children: ReactNode; }) {
    const value = useSnapshot(appSettings).right.mani.openInForms[formIdx];
    return (
        <Accordion
            value={value as string[]}
            onValueChange={(v) => appSettings.right.mani.openInForms[formIdx] = v}
            type="multiple"
        >
            {children}
        </Accordion>
    );
}
