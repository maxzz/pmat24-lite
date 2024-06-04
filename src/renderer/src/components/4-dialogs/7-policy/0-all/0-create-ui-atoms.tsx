import { Getter, Setter } from "jotai";
import { OnValueChangeAny } from "@/util-hooks";
import { debounce } from "@/utils";
import { PolicyDlgConv } from "./0-conv";
import { Mani } from "pm-manifest";

export function createUiAtoms(policies: Mani.FieldPolicy, onChange: OnValueChangeAny): PolicyDlgConv.PolicyUiAtoms {
    const forAtoms = PolicyDlgConv.forAtoms(policies);
    const dlgUiAtoms = PolicyDlgConv.toAtoms(forAtoms, onChange);
    return {
        ...dlgUiAtoms,
        original: policies,
        fromFile: forAtoms,
        changed: false,
    };
}

export function combineResultFromAtoms(dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms, get: Getter, set: Setter) {
    const result = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);

    const changed = !PolicyDlgConv.areTheSame(result, dlgUiAtoms.fromFile);
    dlgUiAtoms.changed = changed;

    console.log(`PolicyDlg changed=${changed}`, JSON.stringify(result));
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);

//TODO: add place where to store the resulting policy
