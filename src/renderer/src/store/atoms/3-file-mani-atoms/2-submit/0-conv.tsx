import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
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

    export function toAtoms(initialState: SubmitForAtoms, onChange: OnValueChangeAny): Atomize<SubmitForAtoms> {
        const { buttonNames, selected, doSubmit, isDoSubmitUndefined } = initialState;
        return {
            buttonNamesAtom: atomWithCallback(buttonNames, onChange),
            selectedAtom: atomWithCallback(selected, onChange),
            doSubmitAtom: atomWithCallback(doSubmit, onChange),
            isDoSubmitUndefinedAtom: atomWithCallback(isDoSubmitUndefined, onChange),
        };
    }

    export function fromAtoms(atoms: SubmitAtoms, get: Getter, set: Setter): SubmitForAtoms {
        const rv = {
            buttonNames: get(atoms.buttonNamesAtom),
            selected: get(atoms.selectedAtom),
            doSubmit: get(atoms.doSubmitAtom),
            isDoSubmitUndefined: get(atoms.isDoSubmitUndefinedAtom),
        };
        return rv;
    }

    //

    export function areTheSame(from: SubmitForAtoms, to: SubmitForAtoms): boolean {
        const rv = (
            from.selected === to.selected &&
            from.doSubmit === to.doSubmit &&
            from.isDoSubmitUndefined === to.isDoSubmitUndefined
        );
        return rv;
    }
}
