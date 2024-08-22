import { FileUs, FormIdx } from "@/store/store-types";
import { FormSections } from "./2-all-sections";
import { NoForm } from "./3-no-form-tab-content";
import { useAtomValue } from "jotai";

export function TabFormEditorGuard({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return <NoForm formType={formIdx} />;
    }

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    return (
        <div className="mr-1 h-full flex flex-col">
            <FormSections maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </div>
    );
}
