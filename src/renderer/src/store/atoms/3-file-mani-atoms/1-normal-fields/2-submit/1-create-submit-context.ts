import { type OnChangeProps, setManiChanges, type FileUsCtx, type ManiAtoms } from "../../9-types";
import { SubmitConv, type SubmitConvTypes } from "./0-conv";
import { debounce } from "@/utils";

export namespace NormalSubmitState {

    export type Atoms = SubmitConvTypes.SubmitAtoms;

    export function createSubmitCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): Atoms {

        const { fileUs, formIdx } = fileUsCtx;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here
        const isWeb = !!metaForm?.mani.detection.web_ourl;
        const forAtoms = SubmitConv.forAtoms(metaForm)

        const onChange = ({ get, set }) => {
            onChangeWithScopeDebounced({fileUsCtx, maniAtoms, get, set});
        }

        const rv: Atoms = {
            ...(SubmitConv.createAtoms(forAtoms, onChange)),
            isWeb,
            metaForm,
            fromFile: forAtoms,
            changed: false,
        };

        return rv;
    }

    function onChangeWithScope({fileUsCtx, maniAtoms, get, set}: OnChangeProps) {
        const nomalFormAtoms = maniAtoms[fileUsCtx.formIdx]!.normal;
        if (!nomalFormAtoms) {
            return;
        }

        const atoms: Atoms = nomalFormAtoms.submitAtoms;

        const fromUi = SubmitConv.fromAtoms(atoms, get, set);
        const changed = !SubmitConv.areTheSame(fromUi, atoms.fromFile);
        atoms.changed = changed;

        const changes = setManiChanges(fileUsCtx, changed, `${fileUsCtx.formIdx?'c':'l'}-submit`);

        console.log('changes submit:', [...changes.keys()]);
    }

    const onChangeWithScopeDebounced = debounce(onChangeWithScope);
}
