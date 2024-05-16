import { ReactNode, useState } from "react";
import { PolicyDlgConv } from "../0-all/0-conv";
import { TestAreaBody } from "./3-test-area-body";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";
import { Button } from "@/ui";

function TestAreaSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
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

function TestAreaOpenState({ children }: { children: ReactNode; }) {
    const [value, setvalue] = useState<string[]>([]);
    return (<>
        <Button onClick={() => setvalue(value.length ? [] : ['policy'])}>
            Trigger
        </Button>

        <Accordion type="multiple" value={value} onValueChange={(v) => setvalue(v)}>
            {children}
        </Accordion>
    </>);
}

export function SectionTestRoom({ atoms }: { atoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <TestAreaOpenState>
            <TestAreaSection label="Test area" value="policy">

                <TestAreaBody />

            </TestAreaSection>
        </TestAreaOpenState>
    );
}
