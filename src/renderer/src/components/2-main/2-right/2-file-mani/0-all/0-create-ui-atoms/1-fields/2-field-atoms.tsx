import { Getter, Setter } from 'jotai';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';
import { FieldConv } from './0-conv';
import { OnValueChangeAny } from '@/util-hooks';

export namespace FieldRowState {

    export function createUiAtoms(field: Meta.Field, onChange: OnValueChangeAny): FieldConv.FieldAtoms {
        const initialState = FieldConv.forAtoms(field);
        return {
            ...FieldConv.toAtoms(initialState, onChange),
            mani: field.mani,
            org: initialState,
            changed: false,
        };
    }

    function combineResultFromAtoms(atoms: FieldConv.FieldAtoms, get: Getter, set: Setter) {
        const state = FieldConv.fromAtoms(atoms, get, set);
        const maniField = FieldConv.forMani(state);

        console.log('TableRow atoms', JSON.stringify(maniField));
        //TODO: use result

        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
