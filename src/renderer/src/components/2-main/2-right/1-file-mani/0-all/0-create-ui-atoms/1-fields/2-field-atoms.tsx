import { Getter, Setter } from 'jotai';
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str } from '@/store/manifest';
import { Atomize, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';

export namespace FieldRowState {

    export type FieldRowForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife; // this includes value and valueAs
        fieldCat: string;
    };
    
    export type FieldRowAtoms = Prettify<Atomize<FieldRowForAtoms>> & { mani: Mani.Field; org: FieldRowForAtoms; changed: boolean; };
    
    /**
     * Fields that are used in this editor
     */
    export type ThisType = Pick<Mani.Field,
        | 'useit'
        | 'displayname'
        | 'type'
        | 'value' // | 'choosevalue'
        | 'password'
        | 'askalways'
        | 'onetvalue'
    >;

    function forAtoms(field: Meta.Field): FieldRowForAtoms {
        const { useit, displayname } = field.mani;
        const rv: FieldRowForAtoms = {
            useIt: !!useit,
            label: displayname || '',
            type: fieldTyp4Str(field.mani),
            valueLife: TransformValue.valueLife4Mani(field.mani),
            fieldCat: '', //TODO:
        };
        return rv;
    }

    function toAtoms(initialState: FieldRowForAtoms, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): Atomize<FieldRowForAtoms> {
        const { useIt, label, type, valueLife, fieldCat } = initialState;
        return {
            useItAtom: atomWithCallback(useIt, onChange),
            labelAtom: atomWithCallback(label, onChange),
            typeAtom: atomWithCallback(type, onChange),
            valueLifeAtom: atomWithCallback(valueLife, onChange),
            fieldCatAtom: atomWithCallback(fieldCat, onChange), //TODO:
        };
    }

    function fromAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter): FieldRowForAtoms {
        const rv = {
            useIt: get(atoms.useItAtom),
            label: get(atoms.labelAtom),
            type: get(atoms.typeAtom),
            valueLife: get(atoms.valueLifeAtom),
            fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
        };
        return rv;
    }

    function toMani(from: FieldRowForAtoms): ThisType {
        const rv: ThisType = {
            useit: from.useIt,
            displayname: from.label,
            ...fieldTyp2Obj(from.type),
        };

        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }

    export function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): FieldRowAtoms {
        const initialState = forAtoms(field);
        return {
            ...toAtoms(initialState, onChange),
            mani: field.mani,
            org: initialState,
            changed: false,
        };
    }

    function combineResultFromAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter) {
        const state = fromAtoms(atoms, get, set);
        const maniField = toMani(state);

        console.log('TableRow atoms', JSON.stringify(maniField));
        //TODO: use result

        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
