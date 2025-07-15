import { debounce } from "@/utils";
import { type FileUsCtx, type ManiAtoms, type OnChangeProps, fileUsChanges, safeManiAtomsFromFileUsCtx } from "../../9-types";
import { type SubmitFieldTypes, SubmitConv } from "../2-submit/0-conv";

export namespace NormalSubmitState {

    export function createSubmitCnt(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): SubmitFieldTypes.Ctx {

        const { fileUs, formIdx } = fileUsCtx;
        const metaForm = fileUs.parsedSrc.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const forAtoms = SubmitConv.forAtoms(metaForm);

        const onChange = ({ get, set }) => {
            onChangeWithScopeDebounced({ fileUsCtx, get, set });
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

function onChangeWithScope({ fileUsCtx, get, set }: OnChangeProps) {
    const nFormCtx = safeManiAtomsFromFileUsCtx(fileUsCtx, get)[fileUsCtx?.formIdx]?.normal;
    if (!nFormCtx) {
        return;
    }

    const atoms: SubmitFieldTypes.Ctx = nFormCtx.submitCtx;
    const fromUi = SubmitConv.fromAtoms(atoms, get, set);
    const changed = !SubmitConv.areTheSame(fromUi, atoms.fromFile);

    fileUsChanges.set(fileUsCtx, changed, `${fileUsCtx.formIdx ? 'c' : 'l'}-submit`);
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
