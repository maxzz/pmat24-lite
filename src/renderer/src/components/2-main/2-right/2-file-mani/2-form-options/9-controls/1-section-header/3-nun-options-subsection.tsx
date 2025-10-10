import { type ReactNode } from "react";
import { proxy, useSnapshot } from "valtio";
//import { appSettings } from "@/store/9-ui-state";
import { FormIdx } from "@/store/manifest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/shadcn/accordion";

/*export*/ function SubSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
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

/*export*/ function OptionsSectionsAccordion({ formIdx, children }: { formIdx: FormIdx; children: ReactNode; }) {
    const opened = useSnapshot(openedStates);
    const value = opened[`${formIdx}`] || [];

    function onValueChange(v: string[]) {
        return openedStates[`${formIdx}`] = v;
    }

    return (
        <Accordion value={value as string[]} onValueChange={onValueChange} type="multiple">
            {children}
        </Accordion>
    );
}

// Nun: here just to keep this file code working
type OpenedArrays = Record<string, string[]>; // key is formIdx as 0/1, value is array of section names
const openedStates = proxy<OpenedArrays>({});
