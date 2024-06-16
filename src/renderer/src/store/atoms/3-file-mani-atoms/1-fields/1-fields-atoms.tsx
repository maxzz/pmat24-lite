import { FieldTyp } from '@/store/manifest';
import { FieldConv } from './0-conv';
import { FieldState } from './2-field-atoms';
import { FileUsParams, ManiAtoms } from "../9-types";

export namespace FieldsState {

    export type Atoms = FieldConv.FieldAtoms;

    export function createUiAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms): Atoms[] {

        const { fileUs, formIdx } = fileUsParams;

        const metaForm = fileUs.meta?.[formIdx]!; // We are under createFormAtoms umbrella, so we can safely use ! here

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        const rv = nonButtonFields.map(
            (field, idx) => {
                const rowAtoms = FieldState.createUiAtoms(field,
                    ({ get, set }) => {
                        return FieldState.debouncedCombinedResultFromAtoms(fileUsParams, maniAtoms, idx, get, set);
                    }
                );
                return rowAtoms;
            }
        ) || [];

        return rv;
    }

    // function combineResultFromAtoms(atoms: Atoms[], get: Getter, set: Setter) {
    //     atoms.forEach((atom) => {
    //         FieldRowState.debouncedCombinedResultFromAtoms(atom, get, set);
    //     });

    //     //TODO: there cannot be a return value, so each atom must do its own thing

    //     //console.log('TableRow atoms', JSON.stringify(result));
    // }

    // export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
