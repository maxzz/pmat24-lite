import { Getter, Setter } from 'jotai';
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp2Obj, fieldTyp4Str } from '@/store/manifest';
import { Atomize, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';

type FieldRowForAtoms = {
    useIt: boolean;
    label: string;
    type: FieldTyp;
    valueLife: ValueLife; // this includes value and valueAs
    fieldCat: string;
};

export type FieldRowAtoms = Prettify<Atomize<FieldRowForAtoms>> & { mani: Mani.Field; };

export namespace FieldRowState {

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

    function field2FieldsForAtoms(field: Meta.Field): FieldRowForAtoms {
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

    function field4FieldsForAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter): FieldRowForAtoms {
        const rv = {
            useIt: get(atoms.useItAtom),
            label: get(atoms.labelAtom),
            type: get(atoms.typeAtom),
            valueLife: get(atoms.valueLifeAtom),
            fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
        };
        return rv;
    }

    export function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): FieldRowAtoms {
        const fieldsForAtoms = field2FieldsForAtoms(field);
        return {
            useItAtom: atomWithCallback(fieldsForAtoms.useIt, onChange),
            labelAtom: atomWithCallback(fieldsForAtoms.label, onChange),
            typeAtom: atomWithCallback(fieldsForAtoms.type, onChange),
            valueLifeAtom: atomWithCallback(fieldsForAtoms.valueLife, onChange),
            fieldCatAtom: atomWithCallback(fieldsForAtoms.fieldCat, onChange), //TODO:
            mani: field.mani,
        };
    }

    function combineResultFromAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter) {
        const result = field4FieldsForAtoms(atoms, get, set);

        // const result2 = {
        //     useIt: get(atoms.useItAtom),
        //     label: get(atoms.labelAtom),
        //     type: fieldTyp2Obj(get(atoms.typeAtom)),
        //     valueLife: get(atoms.valueLifeAtom),
        //     fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
        // };

        // const maniField: Mani.Field = {
        //     ...atoms.mani,
        //     useit: result.useIt,
        //     displayname: result.label,
        //     ...result.type,
        // };
        
        const maniField: ThisType = {
            useit: result.useIt,
            displayname: result.label,
            // ...result.type,
            ...fieldTyp2Obj(result.type),
        };

        TransformValue.valueLife2Mani(result.valueLife, maniField);

        console.log('TableRow atoms', JSON.stringify(maniField));
        //TODO: use result

        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}
