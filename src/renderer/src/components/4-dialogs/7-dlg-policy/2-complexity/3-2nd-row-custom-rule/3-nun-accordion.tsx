import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { Accordion, AccordionContent, AccordionItem } from "@/ui";
import { appSettings } from "@/store/9-ui-state";

export function AccordionSingle({ children }: { children: ReactNode; }) {
    const isTestAreaOpen = useSnapshot(appSettings).right.mani.openTestArea ? ['policy'] : [];
    return (
        <Accordion type="multiple" value={isTestAreaOpen} onValueChange={(v) => appSettings.right.mani.openTestArea = !!v.length}>

            <AccordionItem value="policy" className="border-none">
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}
