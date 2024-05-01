import { FieldTyp } from '@/store/manifest';
import { FieldConv } from './0-conv';
import { FieldRowState } from './2-field-atoms';
import { CreateAtomsParams, ManiAtoms } from '../9-types';

export namespace FieldsState {

    export type Atoms = FieldConv.FieldAtoms;

    export function createUiAtoms({ fileUs, fileUsAtom, formIdx, changesAtom }: CreateAtomsParams, callbackAtoms: ManiAtoms): Atoms[] {

        const metaForm = fileUs.meta?.[formIdx];
        if (!metaForm) {
            return [];
        }

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        const rv = nonButtonFields.map((field, idx) => {
            const rowAtoms = FieldRowState.createUiAtoms(field,
                ({ get, set }) => {
                    return FieldRowState.debouncedCombinedResultFromAtoms(rowAtoms, changesAtom, idx, callbackAtoms, get, set);
                }
            );
            return rowAtoms;
        }) || [];

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
