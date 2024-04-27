import { Getter, Setter, atom } from 'jotai';
import { FieldTyp, Mani, Meta, TransformValue, ValueLife, fieldTyp4Str } from '@/store/manifest';
import { Atomize, atomWithCallback } from '@/util-hooks';
import { debounce } from '@/utils';

type FieldRowForAtoms = {
    useIt: boolean;
    label: string;
    type: FieldTyp;
    valueLife: ValueLife; // this includes value and valueAs
    fieldCat: string;
    mani: Mani.Field;
};

export type FieldRowAtoms = Prettify<Atomize<FieldRowForAtoms>>;

export namespace FieldRowState {

    export function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): FieldRowAtoms {
        const { useit, displayname, type: typ, value: val } = field.mani;
        return {
            useItAtom: atomWithCallback(!!useit, onChange),
            labelAtom: atomWithCallback(displayname || '', onChange),
            typeAtom: atomWithCallback(fieldTyp4Str(field.mani), onChange),
            valueLifeAtom: atomWithCallback(TransformValue.valueLife4Mani(field.mani), onChange),
            fieldCatAtom: atomWithCallback('', onChange), //TODO:
            maniAtom: atom(field.mani),
        };
    }

    function combineResultFromAtoms(atoms: FieldRowAtoms, get: Getter, set: Setter) {
        const result = {
            useIt: get(atoms.useItAtom),
            label: get(atoms.labelAtom),
            type: fieldTyp2Obj(get(atoms.typeAtom)),
            valueLife: get(atoms.valueLifeAtom),
            fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
            mani: get(atoms.maniAtom),
        };

        const maniField: Mani.Field = {
            ...result.mani,
            useit: result.useIt,
            displayname: result.label,
            ...result.type,
        };

        TransformValue.valueLife2Mani(result.valueLife, maniField);

        console.log('TableRow atoms', JSON.stringify(maniField));
        //TODO: use result

        //TODO: cannot return anything
    }

    export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
}

//TODO: use package C:\Y\w\2-web\0-dp\utils\pm-manifest\src\all-types\type-field-type.ts
export function fieldTyp2Obj(typ: FieldTyp): { password?: boolean | undefined; type: Mani.FieldTypeStr; } {
    const type = FieldTyp[typ] as Mani.FieldTypeStr;
    return {
        type,
        ...(typ === FieldTyp.psw && { 'password': true }),
    };
}
