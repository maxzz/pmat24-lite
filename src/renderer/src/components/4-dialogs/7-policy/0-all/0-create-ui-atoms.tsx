import { Getter, Setter } from "jotai";
import { OnValueChangeAny } from "@/util-hooks";
import { debounce } from "@/utils";
import { PolicyDlgConv } from "./0-conv";

export function createUiAtoms(policies: PolicyDlgConv.FieldPolicies, onChange: OnValueChangeAny): PolicyDlgConv.PolicyUiAtoms {
    const data = PolicyDlgConv.forAtoms(policies);
    const atoms = PolicyDlgConv.toAtoms(data, onChange);
    return {
        ...atoms,
        fromFile: data,
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
