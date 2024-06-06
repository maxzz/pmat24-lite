import { Getter, Setter } from "jotai";
import { OnValueChangeAny } from "@/util-hooks";
import { Mani } from "pm-manifest";
import { PolicyDlgConv } from "./0-conv";
import { debounce } from "@/utils";

export function createUiAtoms(policies: Mani.FieldPolicy, onChange: OnValueChangeAny): PolicyDlgConv.PolicyUiAtoms {
    const forAtoms = PolicyDlgConv.forAtoms(policies);
    const dlgUiAtoms = PolicyDlgConv.createAtoms(forAtoms, onChange);

    console.log('%cDlg. useMemo to createUiAtoms', 'color: #f0f');
    return {
        ...dlgUiAtoms,
        original: policies,
        fromFile: forAtoms,
        changed: false,
    };
}

function combineResultFromAtoms(dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms, get: Getter, set: Setter) {
    const dlgUi = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);
    const changed = !PolicyDlgConv.areTheSame(dlgUi, dlgUiAtoms.fromFile);
    dlgUiAtoms.changed = changed;
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
