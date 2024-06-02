import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { ConstrainPsw, ConstrainSet, Mani, Meta, UseAs } from "pm-manifest";

export type TwoPolicies = {
    policy: string | undefined;     // simple policy
    policy2: string | undefined;    // custom policy rule
    options?: string | undefined;   // options for policy. this should not exist in manifest
};

export namespace PolicyDlgConv {

    export type ForAtoms = {
        enabled: boolean;               // Enable password policy
        isCustomRule: '0' | '1';        // boolean; rule type: predefined or custom rule

        constrainSet: string;           // ConstrainSet; predefined rule
        custom: string;                 // customRule

        minLength: number;              // min password length
        maxLength: number;              // max password length

        textVerify: string;             // text to verify policy
        textGenerate: string;           // text to verify policy generation

        constrainsPsw: string;          // ConstrainPsw

        useAs: string;                  // UseAs; by user / by system
    };

    export type PolicyUiAtoms = Prettify<Atomize<ForAtoms> & {
        original: TwoPolicies;          // original state to allow on/off checkbox
        fromFile: ForAtoms;             // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }>;

    // Inital policy

    const initialPolicy: ForAtoms = {
        enabled: true,
        isCustomRule: '0',
        constrainSet: `${ConstrainSet.withspecial}`,
        custom: '',
        minLength: 8,
        maxLength: 12,
        textVerify: '',
        textGenerate: '',
        constrainsPsw: `${ConstrainPsw.diffAp}`,
        useAs: `${UseAs.verify}`,
    };

    // Atoms

    export function forAtoms(policies: TwoPolicies): ForAtoms {
        //TODO: create the default policy but dissabled initially
        //TODO: parse policies and assign to rv

        //TODO: parse policy and assign onChange callback
        // const policy = policies.policy || policies.policy2;

        const rv: ForAtoms = initialPolicy;
        return rv;
    }

    export function toAtoms(initialState: ForAtoms, onChange: OnValueChangeAny): Atomize<ForAtoms> {
        const { enabled, isCustomRule, constrainSet, custom, minLength, maxLength, textVerify, textGenerate, constrainsPsw, useAs } = initialState;
        const rv: Atomize<ForAtoms> = {
            enabledAtom: atomWithCallback(enabled, onChange),
            isCustomRuleAtom: atomWithCallback(isCustomRule, onChange),
            constrainSetAtom: atomWithCallback(constrainSet, onChange),
            customAtom: atomWithCallback(custom, onChange),
            minLengthAtom: atomWithCallback(minLength, onChange),
            maxLengthAtom: atomWithCallback(maxLength, onChange),
            textVerifyAtom: atomWithCallback(textVerify, onChange),
            textGenerateAtom: atomWithCallback(textGenerate, onChange),
            constrainsPswAtom: atomWithCallback(constrainsPsw, onChange),
            useAsAtom: atomWithCallback(useAs, onChange),
        };
        return rv;
    }

    export function fromAtoms(atoms: PolicyUiAtoms, get: Getter, set: Setter): ForAtoms {
        const rv: ForAtoms = {
            enabled: get(atoms.enabledAtom),
            isCustomRule: get(atoms.isCustomRuleAtom),
            constrainSet: get(atoms.constrainSetAtom),
            custom: get(atoms.customAtom),
            minLength: get(atoms.minLengthAtom),
            maxLength: get(atoms.maxLengthAtom),
            textVerify: get(atoms.textVerifyAtom),
            textGenerate: get(atoms.textGenerateAtom),
            constrainsPsw: get(atoms.constrainsPswAtom),
            useAs: get(atoms.useAsAtom),
        };
        return rv;
    }

    // Comparison

    export function areTheSame(from: ForAtoms, to: ForAtoms): boolean {
        const rv = (
            from.enabled === to.enabled &&
            from.isCustomRule === to.isCustomRule &&
            from.constrainSet === to.constrainSet &&
            from.custom === to.custom &&
            from.minLength === to.minLength &&
            from.maxLength === to.maxLength &&
            from.textVerify === to.textVerify &&
            from.textGenerate === to.textGenerate &&
            from.constrainsPsw === to.constrainsPsw &&
            from.useAs === to.useAs
        );
        return rv;
    }

    // Back to manifest

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

}
