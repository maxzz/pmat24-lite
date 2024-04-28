import { FileUs, FormIdx } from "@/store/store-types";
import { FormSectionsOpenState } from "../../2-sections-ui";
import { FormSections } from "./2-form-sections";
import { NoForm } from "./3-no-form-tab-content";
import { useAtomValue } from "jotai";

export function FormEditor({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const maniAtoms = useAtomValue(fileUs.atomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const hasForm = fileUs.meta?.[formIdx];
    if (!hasForm) {
        return <NoForm formType={formIdx} />;
    }

    console.log('FormEditor render', formIdx);

    return (
        <div className="mr-1 h-full flex flex-col">

            <FormSectionsOpenState formIdx={formIdx}>
                <FormSections maniAtoms={maniAtoms} fileUs={fileUs} formIdx={formIdx} />
            </FormSectionsOpenState>
        </div>
    );
}
