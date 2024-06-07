import { ReactNode } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { Accordion, AccordionContent, AccordionItem } from "@/ui";

function TestAreaSection({ value, children }: { value: string; children: ReactNode; }) {
    return (
        <AccordionItem value={value} className="border-none">
            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
}

function TestAreaOpenState({ children, isTestAreaOpenAtom }: { children: ReactNode; isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);
    return (
        <Accordion type="multiple" value={isTestAreaOpen} onValueChange={(v) => setIsTestAreaOpen(v)}>
            {children}
        </Accordion>
    );
}

export function TestRoomAccordion({ children, isTestAreaOpenAtom }: { children: ReactNode; isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    return (
        <TestAreaOpenState isTestAreaOpenAtom={isTestAreaOpenAtom}>
            <TestAreaSection value="policy">

                {children}

            </TestAreaSection>
        </TestAreaOpenState>
    );
}
