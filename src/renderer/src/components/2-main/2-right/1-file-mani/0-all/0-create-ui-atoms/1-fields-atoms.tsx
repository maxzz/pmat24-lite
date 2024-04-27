import { Getter, Setter } from 'jotai';
import { FieldTyp } from '@/store/manifest';
import { debounce } from '@/utils';
import { FileUs, FileUsAtom, FormIdx } from '@/store/store-types';
import { FieldRowAtoms, FieldRowState } from './1-field-atoms';

export type FieldsAtoms = FieldRowAtoms[];

export namespace FieldsState {

    export function createUiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom, formIdx: FormIdx): FieldsAtoms {

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

    function combineResultFromAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter) {
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
