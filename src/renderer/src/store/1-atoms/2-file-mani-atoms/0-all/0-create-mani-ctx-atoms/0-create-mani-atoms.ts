import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type MFormCtx, type NFormCtx, type FileUsCtx, type AnyFormAtoms, type ManiAtoms } from "../../9-types";
import { NormalModeState } from "../../1-normal-fields";
import { ManualFieldsState } from "../../2-manual-fields";
import { OptionsState } from "../../4-options";

export function createManiAtoms({ fileUs, fileUsAtom }: { fileUs: FileUs; fileUsAtom: FileUsAtom; }): ManiAtoms {
    const rv: any = [];
    const maniAtoms = rv as ManiAtoms;

    rv.push(createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.login }, maniAtoms));
    rv.push(createFormCtx({ fileUs, fileUsAtom, formIdx: FormIdx.cpass }, maniAtoms));

    //printCreateManiAtoms(fileUsAtom, fileUs, maniAtoms);
    return rv;
}

function createFormCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): AnyFormAtoms | undefined {

    const { fileUs, formIdx } = fileUsCtx;
    const metaForm = fileUs.parsedSrc.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    let normal: NFormCtx | undefined;
    let manual: MFormCtx | undefined;

    if (metaForm.disp.isScript) {
        manual = ManualFieldsState.createFormCtx(fileUsCtx, maniAtoms);
    } else {
        normal = NormalModeState.createNormalCtx(fileUsCtx, maniAtoms);
    }

    const rv: AnyFormAtoms = {
        normal,
        manual,
        options: OptionsState.createAtoms(fileUsCtx, maniAtoms),
        fileUsCtx: fileUsCtx,
    };

    return rv;
}

function printCreateManiAtoms(fileUsAtom: FileUsAtom, fileUs: FileUs, maniAtoms: ManiAtoms) {
    console.groupCollapsed(
        `%c⛓ createManiAtoms: fileUsAtom:%c${fileUsAtom.toString()} %cuuid:${fileUs.fileCnt.unid}`,
        'font-weight: normal; color: gray',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        { fileUs, maniAtoms }
    );
    console.trace();
    console.groupEnd();
}
