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
            </div>

            <LongPanel />
        </div>
    );
}
