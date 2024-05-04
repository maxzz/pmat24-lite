import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny } from '@/util-hooks';
import { Meta } from "pm-manifest";
import { getSubmitChoices } from "./9-submit-choices";

export namespace SubmitConv {

    type SubmitForAtoms = {
        buttonNames: string[];
        selected: number;
        doSubmit: boolean;
        isDoSubmitUndefined: boolean;   // doSubmit was initially undefined
    };

    export type SubmitAtoms = Prettify<Atomize<SubmitForAtoms> & {
        isWeb: boolean;                 // is web form
        fromFile: SubmitForAtoms;       // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }>;

    //

/**/
    export function forAtoms(metaForm: Meta.Form): SubmitForAtoms {
        const { buttonNames, initialSelected } = getSubmitChoices(metaForm);

        const doSubmit = metaForm.mani.options?.submittype === 'dosubmit';
        const isDoSubmitUndefined = typeof metaForm.mani.options?.submittype === 'undefined';

        const rv: SubmitForAtoms = {
            buttonNames,
            selected: initialSelected,
            doSubmit,
            isDoSubmitUndefined,
        };
        return rv;
    }
/**/
/** /
    export function forMani(from: SubmitForAtoms, metaForm: Meta.Form) {
        const rv: ThisType = {
            useit: from.useIt,
            displayname: from.label,
            dbname: from.dbname,
            ...fieldTyp2Obj(from.type),
        };

        TransformValue.valueLife2Mani(from.valueLife, rv);
        return rv;
    }
/**/

    //
/** /

    export function toAtoms(initialState: SubmitForAtoms, onChange: OnValueChangeAny): Atomize<SubmitForAtoms> {
        const { useIt, label, type, dbname, valueLife } = initialState;
        return {
            useItAtom: atomWithCallback(useIt, onChange),
            labelAtom: atomWithCallback(label, onChange),
            typeAtom: atomWithCallback(type, onChange),
            valueLifeAtom: atomWithCallback(valueLife, onChange),
            dbnameAtom: atomWithCallback(dbname, onChange),
        };
    }
/**/
/** /

    export function fromAtoms(atoms: SubmitAtoms, get: Getter, set: Setter): SubmitForAtoms {
        const rv = {
            useIt: get(atoms.useItAtom),
            label: get(atoms.labelAtom),
            type: get(atoms.typeAtom),
            valueLife: get(atoms.valueLifeAtom),
            dbname: get(atoms.dbnameAtom),
        };
        return rv;
    }
/** /

    //
/** /

    function theSameValue(from: ValueLife, to: ValueLife): boolean {
        const rv = (
            from.value === to.value &&
            from.valueAs === to.valueAs &&
            from.isRef === to.isRef
        );
        return rv;
    }
/** /

/** /
    export function areTheSame(from: SubmitForAtoms, to: SubmitForAtoms): boolean {
        const rv = (
            from.useIt === to.useIt &&
            from.label === to.label &&
            from.type === to.type &&
            from.dbname === to.dbname &&
            theSameValue(from.valueLife, to.valueLife) &&
            from.valueLife.valueAs === to.valueLife.valueAs
        );
        return rv;
    }
/**/
}
