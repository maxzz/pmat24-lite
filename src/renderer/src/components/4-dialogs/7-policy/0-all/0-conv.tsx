import { Getter, Setter } from "jotai";
import { Atomize, OnValueChangeAny, atomWithCallback } from '@/util-hooks';
import { ConstrainPsw, ConstrainSet, Mani, Meta, UseAs } from "pm-manifest";

export namespace PolicyDlgConv {

    export type PolicyUiForAtoms = {
        enabled: boolean;           // Enable password policy
        isCustomRule: '0' | '1';    // boolean; rule type: predefined or custom rule

        constrainSet: string;       // ConstrainSet; predefined rule
        custom: string;             // customRule

        minLength: number;          // min password length
        maxLength: number;          // max password length

        textVerify: string;         // text to verify policy
        textGenerate: string;       // text to verify policy generation

        constrainsPsw: string;      // ConstrainPsw

        useAs: string;              // UseAs; by user / by system
    };

    export type FieldPolicies = {
        policy: string | undefined;
        policy2: string | undefined;
    };

    export type PolicyUiAtoms = Prettify<Atomize<PolicyUiForAtoms> & {
        fromFile: FieldPolicies;        // original state to compare with
        changed: boolean;               // state from atoms is different from original state
    }>;

    // Inital policy

    export const initialPolicy: PolicyUiForAtoms = {
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

    export function forAtoms(policies: FieldPolicies): PolicyUiForAtoms {
        const rv: PolicyUiForAtoms = initialPolicy; //TODO: parse policies and assign to rv
        return rv;
    }

    export function toAtoms(initialState: PolicyUiForAtoms, onChange: OnValueChangeAny): Atomize<PolicyUiForAtoms> {
        const { enabled, isCustomRule, constrainSet, custom, minLength, maxLength, textVerify, textGenerate, constrainsPsw, useAs } = initialState;
        const rv: Atomize<PolicyUiForAtoms> = {
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

    export function fromAtoms(atoms: PolicyUiAtoms, get: Getter, set: Setter): PolicyUiForAtoms {
        const rv: PolicyUiForAtoms = {
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

    export function areTheSame(from: PolicyUiForAtoms, to: PolicyUiForAtoms): boolean {
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
