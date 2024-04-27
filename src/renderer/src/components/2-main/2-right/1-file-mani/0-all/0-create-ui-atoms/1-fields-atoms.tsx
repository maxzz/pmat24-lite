import { Getter, Setter } from 'jotai';
import { FieldTyp } from '@/store/manifest';
import { OnValueChangeAny } from '@/util-hooks';
import { debounce } from '@/utils';
import { FileUs, FileUsAtom, FormIdx } from '@/store/store-types';
import { TableRowAtoms, TableRowState } from './1-field-atoms';

export type FieldsAtoms = TableRowAtoms[];

export namespace FieldsState {

    export function createUiAtoms(fileUs: FileUs, fileUsAtom: FileUsAtom, formIdx: FormIdx, onChange: OnValueChangeAny): FieldsAtoms {

        const metaForm = fileUs.meta?.[formIdx];
        if (!metaForm) {
            return [];
        }
    
        const fields = metaForm.fields || [];
        const nonButtonFields = fields.filter((field) => field.ftyp !== FieldTyp.button);
    
        const tableRowAtoms = nonButtonFields.map((field, idx) => {
            const rv = TableRowState.createUiAtoms(field, ({ get, set }) => TableRowState.debouncedCombinedResultFromAtoms(rv, get, set));
            return rv;
        }) || [];
    
        return tableRowAtoms;
    }

    function combineResultFromAtoms(atoms: TableRowAtoms, get: Getter, set: Setter) {
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
