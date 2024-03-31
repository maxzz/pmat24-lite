import { FileUs, FormIdx } from "@/store/store-types";
import { SubSectionAccordion } from "../2-secotions-ui";
import { LongPanel } from "../../9-nun/LongPanel";
import { FormSections } from "../2-secotions-ui/3-subsection";
import { proxy, useSnapshot } from "valtio";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];

    return (
        <div className="flex flex-col">
            Form {title}

            <div>
                {formMeta?.disp?.domain}

                <SubSectionAccordion label="Form" openKey="fields">
                    <div className="w-96">
                        <LongPanel />
                    </div>
                </SubSectionAccordion>

                <SubSectionAccordion label="Form" openKey="options">
                    <div className="w-96">
                        111
                    </div>
                </SubSectionAccordion>

                <FormSections formIdx={formIdx} />
                {/* <FormSections initialValue={!formIdx ? ["item-1"] : ["item-2", "item-3"]} /> */}
            </div>

            {/* <LongPanel /> */}
        </div>
    );
}

// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/ui/shadcn/accordion";
// import { useState } from "react";

// export function AccordionDemo({ initialValue }: { initialValue: string[]; }) {
//     const [value, setValue] = useState<string[]>(initialValue);
//     function onValueChange(value: string[]) {
//         console.log('AccordionDemo value changed:', value);
//         setValue(value);
//     }
//     return (
//         <Accordion type="multiple" className="w-full" value={value} onValueChange={onValueChange}>

//             <AccordionItem value="item-1">
//                 <AccordionTrigger iconFirst leftDown>Is it accessible?</AccordionTrigger>
//                 <AccordionContent>
//                     <LongPanel />
//                 </AccordionContent>
//             </AccordionItem>

//             <AccordionItem value="item-2">
//                 <AccordionTrigger>Is it styled?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It comes with default styles that matches the other components&apos; aesthetic.
//                 </AccordionContent>
//             </AccordionItem>

//             <AccordionItem value="item-3">
//                 <AccordionTrigger>Is it animated?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It's animated by default, but you can disable it if you prefer.
//                 </AccordionContent>
//             </AccordionItem>

//         </Accordion>
//     );
// }
