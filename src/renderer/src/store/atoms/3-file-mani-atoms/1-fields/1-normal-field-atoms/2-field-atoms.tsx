import { type Getter, type Setter } from 'jotai';
import { type Meta } from '@/store/manifest';
import { type NormalField, NormalFieldConv } from './0-conv';
import { type OnValueChangeAny } from '@/util-hooks';
import { type FileUsParams, type ManiAtoms, setManiChanges } from "../../9-types";
import { debounce } from '@/utils';

export namespace NormalFieldState {

    export function createUiAtoms(field: Meta.Field, onChange: OnValueChangeAny): NormalField.FieldAtoms {
        const forAtoms = NormalFieldConv.forAtoms(field.mani);
        return {
            ...NormalFieldConv.createAtoms(forAtoms, onChange),
            metaField: field,
            fromFile: forAtoms,
            changed: false,
        };
    }

    function combineResultFromAtoms(fileUsParams: FileUsParams, maniAtoms: ManiAtoms, fieldIdx: number, get: Getter, set: Setter) {

        const atoms: NormalField.FieldAtoms = maniAtoms[fileUsParams.formIdx]!.normal.fieldsAtoms[fieldIdx];

        const state = NormalFieldConv.fromAtoms(atoms, get, set);
        const changed = !NormalFieldConv.areTheSame(state, atoms.fromFile);
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
