import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { Mani, Meta } from "pm-manifest";

export namespace PolicyConv {

    type PolicyForAtoms = {
        policy: string;
        policy2: string;
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
            policy2: field.mani.policy2 || ''
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
        const { policy, policy2 } = initialState;
        return {
            policyAtom: atomWithCallback(policy, onChange),
            policy2Atom: atomWithCallback(policy2, onChange),
        };
    }

    export function fromAtoms(atoms: PolicyAtoms, get: Getter, set: Setter): PolicyForAtoms {
        const rv = {
            policy: get(atoms.policyAtom),
            policy2: get(atoms.policy2Atom),
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
