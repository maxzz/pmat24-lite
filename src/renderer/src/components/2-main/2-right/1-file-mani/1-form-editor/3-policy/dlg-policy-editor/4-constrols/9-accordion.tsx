import { ReactNode, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";

export function TestAreaSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value}>
            <div className="inline-block">
                <AccordionTrigger iconFirst leftDown className="1p-2 1pb-0 text-mani-title">
                    {label}
                </AccordionTrigger>
            </div>

            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

export function TestAreaOpenState({ children }: { children: ReactNode; }) {
    const [value, setvalue] = useState<string[]>([]);
    return (
        <Accordion type="multiple" value={value} onValueChange={(v) => setvalue(v)}>
            {children}
        </Accordion>
    );
}
