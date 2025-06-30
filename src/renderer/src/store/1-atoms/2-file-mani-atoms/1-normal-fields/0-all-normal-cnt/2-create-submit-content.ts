import { type FileUsCtx, type ManiAtoms, type OnChangeProps, fileUsChanges } from "../../9-types";
import { debounce } from "@/utils";
import { type SubmitFieldTypes, SubmitConv } from "../2-submit/0-conv";

export namespace NormalSubmitState {

    export function createSubmitCnt(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): SubmitFieldTypes.Ctx {

        const { fileUs, formIdx } = fileUsCtx;
        const metaForm = fileUs.parsedSrc.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const forAtoms = SubmitConv.forAtoms(metaForm);

        const onChange = ({ get, set }) => {
            onChangeWithScopeDebounced({ fileUsCtx, maniAtoms, get, set });
        };

        const rv: SubmitFieldTypes.Ctx = {
            ...SubmitConv.createAtoms(forAtoms, onChange),
            isWeb: !!metaForm?.mani.detection.web_ourl,
            metaForm,
            fromFile: forAtoms,
        };

        return rv;
    }
}

function onChangeWithScope({ fileUsCtx, maniAtoms, get, set }: OnChangeProps) {
    const nomalFormAtoms = maniAtoms[fileUsCtx.formIdx]!.normal;
    if (!nomalFormAtoms) {
        return;
    }

    const atoms: SubmitFieldTypes.Ctx = nomalFormAtoms.submitCtx;
    const fromUi = SubmitConv.fromAtoms(atoms, get, set);
    const changed = !SubmitConv.areTheSame(fromUi, atoms.fromFile);

    fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-submit`);
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
