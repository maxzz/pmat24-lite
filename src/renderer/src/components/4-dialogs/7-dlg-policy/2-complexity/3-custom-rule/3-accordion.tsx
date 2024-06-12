import { ReactNode } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Accordion, AccordionContent, AccordionItem } from "@/ui";
import { appSettings } from "@/store";

export function AccordionSingle({ children, isOpenAtom }: { children: ReactNode; isOpenAtom: PrimitiveAtom<string[]>; }) {
    // const [isTestAreaOpen, setIsTestAreaOpen] = useAtom(isOpenAtom);
    // onClick={() => setIsTestAreaOpen(isTestAreaOpen.length ? [] : ['policy'])}
    const testAreaOpen = useSnapshot(appSettings).right.mani.testAreaOpen ? ['policy'] : [];
    return (
        <Accordion type="multiple" value={testAreaOpen} onValueChange={(v) => v.length ? appSettings.right.mani.testAreaOpen = true : appSettings.right.mani.testAreaOpen = false

        }>

            <AccordionItem value="policy" className="border-none">
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}
