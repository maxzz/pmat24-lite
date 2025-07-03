import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { type FormIdx } from "@/store/manifest";
import { type FileUs } from "@/store/store-types";
import { type ManiAtoms, type MFormCtx, type MFormProps, type NFormCtx, type NFormProps } from "@/store/1-atoms/2-file-mani-atoms";
import { TabContent_NormalForm } from "./2-tab-content-normal";
import { TabContent_ManualForm } from "./3-tab-content-manual";
import { TabContent_NoForm } from "./4-tab-content-no-form";

export function ManiEditorFormSelector({ fileUs, formIdx, ...rest }: { fileUs: FileUs; formIdx: FormIdx; } & ComponentPropsWithoutRef<'div'>) {
    const maniAtoms = useAtomValue(fileUs.maniAtomsAtom);
    if (!maniAtoms) {
        return null;
    }
    //printFormEditor(fileUs, formIdx, maniAtoms);

    const formCtx = maniAtoms[formIdx];
    if (!formCtx) {
        return <TabContent_NoForm formIdx={formIdx} {...rest} />;
    }

    if (formCtx.manual) {
        const mFormProps: MFormProps = { maniAtoms, formIdx, mFormCtx: formCtx as MFormCtx };
        return (
            <TabContent_ManualForm mFormProps={mFormProps} {...rest} />
        );
    }

    if (formCtx.normal) {
        const nFormProps: NFormProps = { maniAtoms, formIdx, nFormCtx: formCtx as NFormCtx };
        return (
            <TabContent_NormalForm nFormProps={nFormProps} />
        );
    }

    return null;
}

function printFormEditor(fileUs: FileUs, formIdx: FormIdx, maniAtoms: ManiAtoms | null) {
    const fileUsAtom = maniAtoms?.[0]?.fileUsCtx?.fileUsAtom;
    console.groupCollapsed(
        `%c💎                FormSelector: fileUsAtom:%c${fileUsAtom ? fileUsAtom.toString() : 'null'} %cmaniAtomsAtom:%c${fileUs.maniAtomsAtom?.toString()} %cformIdx=${formIdx}`,
        fileUs.maniAtomsAtom ? 'font-weight: normal; color: gray' : 'font-weight: normal; color: red',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
        // { fileUs }
    );
    console.trace();
    console.groupEnd();
}
