import { FileUs, FormIdx } from "@/store/store-types";
import { FormSectionsAccordion } from "../../2-sections-ui";
import { FormSections } from "./2-all-sections";
import { NoForm } from "./3-no-form-tab-content";
import { useAtomValue } from "jotai";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return <NoForm formType={formIdx} />;
    }

    return (
        <div className="mr-1 h-full flex flex-col">

            <FormSectionsAccordion formIdx={formIdx}>
                <FormSections maniAtoms={maniAtoms} formIdx={formIdx} />
            </FormSectionsAccordion>
            
        </div>
    );
}
