import { Getter, Setter } from 'jotai';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';
import { FieldConv } from './0-conv';
import { OnValueChangeAny } from '@/util-hooks';
import { ManiAtoms, ManiChangesAtom } from '../9-types';

export namespace FieldRowState {

    export function createUiAtoms(field: Meta.Field, fieldIdx: number, onChange: OnValueChangeAny): FieldConv.FieldAtoms {
        const forAtoms = FieldConv.forAtoms(field);
        return {
            ...FieldConv.toAtoms(forAtoms, onChange),
            maniField: field.mani,
            fromFile: forAtoms,
            changed: false,
        };
    }

    function combineResultFromAtoms(atoms: FieldConv.FieldAtoms, changesAtom: ManiChangesAtom, callbackAtoms: ManiAtoms, get: Getter, set: Setter) {

        console.log('callbackAtoms', callbackAtoms);

        const state = FieldConv.fromAtoms(atoms, get, set);
        const same = FieldConv.areTheSame(state, atoms.fromFile);

        console.log('counters:', get(callbackAtoms[2]));

        set(callbackAtoms[2], (n: number) => same ? n - 1 : n + 1);

        const maniField = FieldConv.forMani(state);
        const maniFiel2 = FieldConv.forMani(atoms.fromFile);

        console.log('------------------------------------');
        console.log('TableRow atoms fr, same =', same, 'fields:', JSON.stringify(maniField));
        console.log('TableRow atoms to, same =', same, 'fields:', JSON.stringify(maniFiel2));
        //TODO: use result

        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
