import { Getter, Setter } from "jotai";
import { OnValueChangeAny } from "@/util-hooks";
import { debounce } from "@/utils";
import { PolicyDlgConv } from "./0-conv";
import { Mani } from "pm-manifest";

export function createUiAtoms(policies: Mani.FieldPolicy, onChange: OnValueChangeAny): PolicyDlgConv.PolicyUiAtoms {
    const forAtoms = PolicyDlgConv.forAtoms(policies);
    const atoms = PolicyDlgConv.toAtoms(forAtoms, onChange);
    return {
        ...atoms,
        original: policies,
        fromFile: forAtoms,
        changed: false,
    };
}

export function combineResultFromAtoms(atoms: PolicyDlgConv.PolicyUiAtoms, get: Getter, set: Setter) {
    const result = PolicyDlgConv.fromAtoms(atoms, get, set);

    const changed = !PolicyDlgConv.areTheSame(result, atoms.fromFile);

    console.log('PolicyDlg changed=', changed, JSON.stringify(result));
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);

//TODO: add place where to store the resulting policy
