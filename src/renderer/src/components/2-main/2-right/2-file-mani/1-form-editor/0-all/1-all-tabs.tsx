import { FileUs, FormIdx } from "@/store/store-types";
import { NormalFormTabContent } from "./2-all-normal-tab-content";
import { NoFormTabContent } from "./8-no-form-tab-content";
import { useAtomValue } from "jotai";
import { ManualFormTabContent } from "./3-all-manual-tab-content";

export function TabFormEditorGuard({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return <NoFormTabContent formType={formIdx} />;
    }

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    const isMamual = metaForm.disp.isScript;
    if (isMamual) {
        return (
            <ManualFormTabContent maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        );
    }

    return (
        <div className="mr-1 h-full flex flex-col">
            <NormalFormTabContent maniAtoms={maniAtoms} formAtoms={formAtoms} formIdx={formIdx} />
        </div>
    );
}
