import { ReactNode, useState } from "react";
import { PolicyDlgConv } from "../0-all/0-conv";
import { TestAreaBody } from "./3-test-area-body";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/ui/shadcn/accordion";
import { Button } from "@/ui";
import { PrimitiveAtom, useAtom } from "jotai";

function TestAreaSection({ value, label, children }: { value: string; label: ReactNode; children: ReactNode; }) {
    return (
        <AccordionItem value={value} className="border-none">
            {/* <div className="inline-block">
                <AccordionTrigger iconFirst leftDown className="pl-2 pr-4 py-2 text-xs border-border border rounded shadow">
                    {label}
                </AccordionTrigger>
            </div> */}

            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

function TestAreaOpenState({ children, isTestAreaOpenAtom }: { children: ReactNode; isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    //const [value, setvalue] = useState<string[]>([]);
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);
    return (<>
        <Accordion type="multiple" value={isTestAreaOpen} onValueChange={(v) => setIsTestAreaOpen(v)}>
            {children}
        </Accordion>
    </>);
}

export function SectionTestRoom({ atoms, isTestAreaOpenAtom }: { atoms: PolicyDlgConv.PolicyUiAtoms; isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    return (
        <TestAreaOpenState isTestAreaOpenAtom={isTestAreaOpenAtom}>
            <TestAreaSection label="Test area" value="policy">

                <TestAreaBody />

            </TestAreaSection>
        </TestAreaOpenState>
    );
}
