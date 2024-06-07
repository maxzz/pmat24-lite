import { ReactNode } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { Accordion, AccordionContent, AccordionItem } from "@/ui";

export function TestRoomAccordion({ children, isTestAreaOpenAtom }: { children: ReactNode; isTestAreaOpenAtom: PrimitiveAtom<string[]>; }) {
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isTestAreaOpenAtom);
    return (
        <Accordion type="multiple" value={isTestAreaOpen} onValueChange={(v) => setIsTestAreaOpen(v)}>

            <AccordionItem value="policy" className="border-none">
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}
