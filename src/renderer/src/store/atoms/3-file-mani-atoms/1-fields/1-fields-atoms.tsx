import { Getter, Setter } from 'jotai';
import { FieldTyp } from '@/store/manifest';
import { debounce } from '@/utils';
import { FileUs, FileUsAtom, FormIdx } from '@/store/store-types';
import { FieldConv } from './0-conv';
import { FieldRowState } from './2-field-atoms';
import { ManiChangesAtom } from '../9-types';

export namespace FieldsState {

    export type Atoms = FieldConv.FieldAtoms;

    export function createUiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom, formIdx: FormIdx, changesAtom: ManiChangesAtom): Atoms[] {

        const metaForm = fileUs.meta?.[formIdx];
        if (!metaForm) {
            return [];
        }

        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);

        const rv = nonButtonFields.map((field, idx) => {
            const rowAtoms = FieldRowState.createUiAtoms(field,
                ({ get, set }) => {
                    return FieldRowState.debouncedCombinedResultFromAtoms(rowAtoms, get, set);
                });
            return rowAtoms;
        }) || [];

        return rv;
    }

    function combineResultFromAtoms(atoms: Atoms[], get: Getter, set: Setter) {
        atoms.forEach((atom) => {
            FieldRowState.debouncedCombinedResultFromAtoms(atom, get, set);
        });

        //TODO: there cannot be a return value, so each atom must do its own thing
        
        //console.log('TableRow atoms', JSON.stringify(result));
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
