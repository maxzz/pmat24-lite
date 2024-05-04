import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Mani, Meta } from "pm-manifest";

export namespace PolicyConv {

    type PolicyForAtoms = {
        policy: string;
        policy2: string;
        policyText: string;             // display text to show in grid; short policy explabation
    };

    export type PolicyAtoms = Prettify<Atomize<PolicyForAtoms> & {
        maniField: Mani.Field;          // all fields from original to combine with fields from atoms to create new field
        fromFile: PolicyForAtoms;       // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }>;

    /**/
    export function forAtoms(field: Meta.Field): PolicyForAtoms {
        const rv: PolicyForAtoms = {
            policy: field.mani.policy || '',
            policy2: field.mani.policy2 || '',
            policyText: 'TODO: short policy explabation', // or show custom policy rule, or standard policy rule
        };
        return rv;
    }
    /**/

    /** /
    export function forMani(from: PolicyForAtoms, metaForm: Meta.Form) {
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

    export function toAtoms(initialState: PolicyForAtoms, onChange: OnValueChangeAny): Atomize<PolicyForAtoms> {
        const { policy, policy2, policyText } = initialState;
        return {
            policyAtom: atomWithCallback(policy, onChange),
            policy2Atom: atomWithCallback(policy2, onChange),
            policyTextAtom: atomWithCallback(policyText, onChange),
        };
    }

    export function fromAtoms(atoms: PolicyAtoms, get: Getter, set: Setter): PolicyForAtoms {
        const rv = {
            policy: get(atoms.policyAtom),
            policy2: get(atoms.policy2Atom),
            policyText: get(atoms.policyTextAtom),
        };
        return rv;
    }
    
    //
    
    export function areTheSame(from: PolicyForAtoms, to: PolicyForAtoms): boolean {
        const rv = (
            from.policy === to.policy &&
            from.policy2 === to.policy2
        );
        return rv;
    }

}
