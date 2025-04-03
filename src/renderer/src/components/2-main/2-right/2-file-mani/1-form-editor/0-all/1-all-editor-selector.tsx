import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { type FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type MFormAtoms, type MFormContextProps, type NFormAtoms, type NFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { TabContentNormalForm } from "./2-tab-content-normal";
import { TabContentManualForm } from "./3-tab-content-manual";
import { TabContentNoForm } from "./4-tab-content-no-form";

export function ManiEditorFormSelector({ fileUs, formIdx, ...rest }: { fileUs: FileUs; formIdx: FormIdx; } & ComponentPropsWithoutRef<'div'>) {

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return <TabContentNoForm formType={formIdx} {...rest} />;
    }

    const formAtoms = maniAtoms[formIdx];
    if (!formAtoms) {
        return null;
    }

    if (formAtoms.manual) {
        const ctx: MFormContextProps = { maniAtoms, mAllAtoms: formAtoms as MFormAtoms, formIdx };
        return (
            <TabContentManualForm ctx={ctx} {...rest} />
        );
    }

    if (formAtoms.normal) {
        const ctx: NFormContextProps = { maniAtoms, nAllAtoms: formAtoms as NFormAtoms, formIdx };
        return (
            <TabContentNormalForm ctx={ctx} />
        );
    }

    return null;
}
