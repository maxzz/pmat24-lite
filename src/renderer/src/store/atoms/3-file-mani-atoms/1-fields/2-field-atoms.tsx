import { Getter, Setter } from 'jotai';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';
import { FieldConv } from './0-conv';
import { OnValueChangeAny } from '@/util-hooks';
import { setManiChanges } from '../9-types';
import { CreateAtomsParams, ManiAtoms } from "../9-types";

export namespace FieldRowState {

    export function createUiAtoms(field: Meta.Field, onChange: OnValueChangeAny): FieldConv.FieldAtoms {
        const forAtoms = FieldConv.forAtoms(field);
        return {
            ...FieldConv.toAtoms(forAtoms, onChange),
            metaField: field,
            fromFile: forAtoms,
            changed: false,
        };
    }

    function combineResultFromAtoms(createAtomsParams: CreateAtomsParams, callbackAtoms: ManiAtoms, fieldIdx: number, get: Getter, set: Setter) {

        const atoms: FieldConv.FieldAtoms = callbackAtoms[createAtomsParams.formIdx]!.fieldsAtoms[fieldIdx];

        const state = FieldConv.fromAtoms(atoms, get, set);
        const changed = !FieldConv.areTheSame(state, atoms.fromFile);
        atoms.changed = changed;

        const changes = setManiChanges(createAtomsParams, changed, `${createAtomsParams.formIdx?'c':'l'}-f-${fieldIdx}`);

        console.log('changes fields:', [...changes.keys()]);
        
        // const maniField = FieldConv.forMani(state);
        // const maniFiel2 = FieldConv.forMani(atoms.fromFile);

        // console.log('------------------------------------');
        // console.log('TableRow atoms fr, same =', same, 'fields:', JSON.stringify(maniField));
        // console.log('TableRow atoms to, same =', same, 'fields:', JSON.stringify(maniFiel2));

        //TODO: use result
        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
