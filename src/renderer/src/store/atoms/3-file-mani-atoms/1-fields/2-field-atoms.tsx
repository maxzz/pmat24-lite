import { Getter, Setter } from 'jotai';
import { Meta } from '@/store/manifest';
import { debounce } from '@/utils';
import { FieldConv } from './0-conv';
import { OnValueChangeAny } from '@/util-hooks';
import { FileUsParams, ManiAtoms, setManiChanges } from "../9-types";

export namespace FieldState {

    export function createUiAtoms(field: Meta.Field, onChange: OnValueChangeAny): FieldConv.FieldAtoms {
        const forAtoms = FieldConv.forAtoms(field);
        return {
            ...FieldConv.createAtoms(forAtoms, onChange),
            metaField: field,
            fromFile: forAtoms,
            changed: false,
        };
    }

    function combineResultFromAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms, fieldIdx: number, get: Getter, set: Setter) {

        const atoms: FieldConv.FieldAtoms = maniAtoms[fileUsParams.formIdx]!.fieldsAtoms[fieldIdx];

        const state = FieldConv.fromAtoms(atoms, get, set);
        const changed = !FieldConv.areTheSame(state, atoms.fromFile);
        atoms.changed = changed;

        const changes = setManiChanges(fileUsParams, changed, `${fileUsParams.formIdx?'c':'l'}-f-${fieldIdx}`);

        /** /
        const str1 = JSON.stringify(state.policies, null, 2);
        const str2 = JSON.stringify(atoms.fromFile.policies, null, 2);
        const str3 = changes.size ? `\nstate ${str1}\nfile ${str2}` : '';
        console.log(`%cCombineField: [${[...changes.keys()]}]%c${str3}`, 'background-color: navy; color: bisque', 'background-color: #282828; color: white');
        /**/
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
