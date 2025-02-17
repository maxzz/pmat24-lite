import { type FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type MFormAtoms, type MFormContextProps, type NFormAtoms, type NFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { NormalFormTabContent } from "./2-all-normal-tab-content";
import { NoFormTabContent } from "./8-no-form-tab-content";
import { useAtomValue } from "jotai";
import { ManualFormTabContent } from "./3-all-manual-tab-content";

export function ManiEditorFormSelector({ fileUs, formIdx }: { fileUs: FileUs; formIdx: FormIdx; }) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return <NoFormTabContent formType={formIdx} />;
    }

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    if (formAtoms.manual) {
        const ctx: MFormContextProps = { maniAtoms, mAllAtoms: formAtoms as MFormAtoms, formIdx };
        return (
            <ManualFormTabContent ctx={ctx} />
        );
    }

    if (formAtoms.normal) {
        const ctx: NFormContextProps = { maniAtoms, nAllAtoms: formAtoms as NFormAtoms, formIdx };
        return (
            <NormalFormTabContent ctx={ctx} />
        );
    }

    return null;
}
