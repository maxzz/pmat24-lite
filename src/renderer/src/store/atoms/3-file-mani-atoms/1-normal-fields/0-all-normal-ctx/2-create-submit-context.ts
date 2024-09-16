import { type FileUsCtx, type ManiAtoms, type OnChangeProps, setManiChanges } from "../../9-types";
import { type SubmitConvTypes, SubmitConv } from "../2-submit/0-conv";
import { debounce } from "@/utils";

export namespace NormalSubmitState {

    export type Atoms = SubmitConvTypes.SubmitAtoms;

    export function createSubmitCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): Atoms {

        const onChange = ({ get, set }) => {
            onChangeWithScopeDebounced({fileUsCtx, maniAtoms, get, set});
        }

        const { fileUs, formIdx } = fileUsCtx;
        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const forAtoms = SubmitConv.forAtoms(metaForm)

        const rv: Atoms = {
            ...SubmitConv.createAtoms(forAtoms, onChange),
            isWeb: !!metaForm?.mani.detection.web_ourl,
            metaForm,
            fromFile: forAtoms,
        };

        return rv;
    }
}

function onChangeWithScope({fileUsCtx, maniAtoms, get, set}: OnChangeProps) {
    const nomalFormAtoms = maniAtoms[fileUsCtx.formIdx]!.normal;
    if (!nomalFormAtoms) {
        return;
    }

    const atoms: NormalSubmitState.Atoms = nomalFormAtoms.submitAtoms;
    const fromUi = SubmitConv.fromAtoms(atoms, get, set);
    const changed = !SubmitConv.areTheSame(fromUi, atoms.fromFile);

    setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx?'c':'l'}-submit`);
}

const onChangeWithScopeDebounced = debounce(onChangeWithScope);
