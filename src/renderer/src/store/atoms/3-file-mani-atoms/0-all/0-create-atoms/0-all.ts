import { proxySet } from "valtio/utils";
import { type FileUs, type FileUsAtom, FormIdx } from "@/store/store-types";
import { type ManualFormAtoms, type NormalFormAtoms, type FileUsParams, type AnyFormAtoms, type ManiAtoms } from "../../9-types";
import { NormalFieldsState, NormalSubmitState } from "../../1-normal-fields";
import { OptionsState } from "../../4-options";

function createFormAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): AnyFormAtoms | undefined {

    const { fileUs, formIdx } = fileUsParams;
    const metaForm = fileUs.meta?.[formIdx]; // This is parent's umbrella, so we can safely use ! enywhere under it
    if (!metaForm) {
        return;
    }

    fileUsParams.isWeb = !!metaForm.disp.domain;
    fileUsParams.isManual = metaForm.disp.isScript;

    let normalFormAtoms: NormalFormAtoms | undefined;
    let manualFormAtoms: ManualFormAtoms | undefined;

    if (fileUsParams.isManual) {
        //manualFormAtoms: ManualFormAtoms | undefined = undefined;
    } else {
        normalFormAtoms = {
            fieldsAtoms: NormalFieldsState.createUiAtoms(fileUsParams, maniAtoms),
            submitAtoms: NormalSubmitState.createUiAtoms(fileUsParams, maniAtoms),
        };
    }

    const rv: AnyFormAtoms = {
        normal: normalFormAtoms,
        manual: manualFormAtoms,
        options: OptionsState.createAtoms(fileUsParams, maniAtoms),
        fileUsParams,
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
