import { ReactNode, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";

export function TestAreaSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value} className="border-none">
            <div className="inline-block">
                <AccordionTrigger iconFirst leftDown className="pl-2 pr-4 py-2 text-xs border-border border rounded shadow">
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
