import { FileUs } from "@/store/store-types";
import { LongPanel } from "../../9-nun/LongPanel";
import { SubSectionAccordion } from "../3-secotions-ui/1-sub-section-accordion";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: number; }) {
    const title = formIdx === 0 ? 'Login' : 'Password change';
    const formMeta = fileUs.meta?.[formIdx];
    return (
        <div className="flex flex-col">
            Form {title}

            <div>
                {formMeta?.disp?.domain}

                <SubSectionAccordion label="Form" openKey="fields">
                    <div>
                        111
                    </div>
                </SubSectionAccordion>
            </div>

            <LongPanel />
        </div>
    );
}
