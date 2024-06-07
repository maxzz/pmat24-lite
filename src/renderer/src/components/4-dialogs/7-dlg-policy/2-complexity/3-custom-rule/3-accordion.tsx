import { ReactNode } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { Accordion, AccordionContent, AccordionItem } from "@/ui";

export function AccordionSingle({ children, isOpenAtom }: { children: ReactNode; isOpenAtom: PrimitiveAtom<string[]>; }) {
    const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isOpenAtom);
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
