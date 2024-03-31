import { FileUs } from "@/store/store-types";
import { SubSectionAccordion } from "../2-secotions-ui";
import { LongPanel } from "../../9-nun/LongPanel";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];
    return (
        <div className="flex flex-col">
            Form {title}

            <div>
                {formMeta?.disp?.domain}

                <SubSectionAccordion label="Form" openKey="fields">
                    <div className="w-96">
                        111
                    </div>
                </SubSectionAccordion>

                <SubSectionAccordion label="Form" openKey="options">
                    <div className="w-96">
                        111
                    </div>
                </SubSectionAccordion>

                <AccordionDemo />
            </div>

            <LongPanel />
        </div>
    );
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui/shadcn/accordion";

export function AccordionDemo() {
    return (
        <Accordion type="multiple" className="w-full">

            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
            
        </Accordion>
    );
}
