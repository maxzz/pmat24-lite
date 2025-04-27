import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { type FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type MFormAtoms, type MFormContextProps, type NFormAtoms, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { TabContent_NormalForm } from "./2-tab-content-normal";
import { TabContent_ManualForm } from "./3-tab-content-manual";
import { TabContent_NoForm } from "./4-tab-content-no-form";

export function ManiEditorFormSelector({ fileUs, formIdx, ...rest }: { fileUs: FileUs; formIdx: FormIdx; } & ComponentPropsWithoutRef<'div'>) {
    printFormEditor(fileUs, formIdx);

    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }

    const formManiAtoms = maniAtoms[formIdx];
    if (!formManiAtoms) {
        return <TabContent_NoForm formType={formIdx} {...rest} />;
    }

    if (formManiAtoms.manual) {
        const ctx: MFormContextProps = { maniAtoms, mAllAtoms: formManiAtoms as MFormAtoms, formIdx };
        return (
            <TabContent_ManualForm ctx={ctx} {...rest} />
        );
    }

    if (formManiAtoms.normal) {
        const ctx: NFormContextProps = { maniAtoms, nAllAtoms: formManiAtoms as NFormAtoms, formIdx };
        return (
            <TabContent_NormalForm ctx={ctx} />
        );
    }

    return null;
}

function printFormEditor(fileUs: FileUs, formIdx: FormIdx) {
    console.groupCollapsed(
        `%c💎             ManiEditorFormSelector: formIdx=${formIdx} maniAtomsAtom:%c${fileUs.maniAtomsAtom?.toString()} %cuuid:${fileUs.fileCnt?.unid}`,
        fileUs.maniAtomsAtom ? 'font-weight: normal; color: gray' : 'font-weight: normal; color: red',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
        { fileUs }
    );
    console.trace();
    console.groupEnd();
}
