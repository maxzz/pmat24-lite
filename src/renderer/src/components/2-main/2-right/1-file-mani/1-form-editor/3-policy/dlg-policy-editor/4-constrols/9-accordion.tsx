import { ReactNode, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";
import { Button } from "@/ui";

export function TestAreaSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value} className="border-none">
            <div className="inline-block">
                <AccordionTrigger iconFirst leftDown className="px-2 py-2 text-xs border-border border rounded">
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
