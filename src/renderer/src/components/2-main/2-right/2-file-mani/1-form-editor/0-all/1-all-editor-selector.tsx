import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { type FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type MFormAtoms, type MFormContextProps, type NFormAtoms, type NFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { NormalFormTabContent } from "./2-tab-content-normal";
import { ManualFormTabContent } from "./3-tab-content-manual";
import { NoFormTabContent } from "./8-tab-content-no-form";

export function ManiEditorFormSelector({ fileUs, formIdx, ...rest }: { fileUs: FileUs; formIdx: FormIdx; } & ComponentPropsWithoutRef<'div'>) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return <NoFormTabContent formType={formIdx} {...rest} />;
    }

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    if (formAtoms.manual) {
        const ctx: MFormContextProps = { maniAtoms, mAllAtoms: formAtoms as MFormAtoms, formIdx };
        return (
            <ManualFormTabContent ctx={ctx} {...rest} />
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
