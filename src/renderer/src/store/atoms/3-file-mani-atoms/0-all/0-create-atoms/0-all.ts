import { proxySet } from "valtio/utils";
import { type FileUs, type FileUsAtom, FormIdx } from "@/store/store-types";
import { type MFormCtx, type NFormCtx, type FileUsCtx, type AnyFormAtoms, type ManiAtoms } from "../../9-types";
import { NormalFieldsState, NormalSubmitState } from "../../1-normal-fields";
import { OptionsState } from "../../4-options";
import { ManualFieldsState } from "../../2-manual-fields";

function createFormAtoms(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): AnyFormAtoms | undefined {

    const { fileUs, formIdx } = fileUsCtx;
    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    const isManual = metaForm.disp.isScript;

    let normalFormAtoms: NFormCtx | undefined;
    let manualFormAtoms: MFormCtx | undefined;

    if (isManual) {
        manualFormAtoms = ManualFieldsState.createUiAtoms(fileUsCtx, maniAtoms);
    } else {
        normalFormAtoms = {
            fieldsAtoms: NormalFieldsState.createUiAtoms(fileUsCtx, maniAtoms),
            submitAtoms: NormalSubmitState.createUiAtoms(fileUsCtx, maniAtoms),
        };
    }

    const rv: AnyFormAtoms = {
        normal: normalFormAtoms,
        manual: manualFormAtoms,
        options: OptionsState.createAtoms(fileUsCtx, maniAtoms),
        fileUsCtx: fileUsCtx,
    };

    return rv;
}

export function createManiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom): ManiAtoms {
    const rv: any = [];
    const maniAtoms = rv as ManiAtoms;

    const changesSet = proxySet<string>();

    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.login }, maniAtoms));
    rv.push(createFormAtoms({ fileUs, fileUsAtom, formIdx: FormIdx.cpass }, maniAtoms));
    rv.push(changesSet);

    return rv;
}
