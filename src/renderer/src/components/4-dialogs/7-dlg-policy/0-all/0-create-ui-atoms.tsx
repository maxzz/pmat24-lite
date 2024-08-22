import { Getter, Setter } from "jotai";
import { OnValueChangeAny } from "@/util-hooks";
import { Mani } from "pm-manifest";
import { PolicyDlgConv } from "./0-conv";
import { debounce } from "@/utils";
import { PolicyParser } from "@/store/manifest/3-policy-io";

export function createUiAtoms(policies: Mani.FieldPolicy, onChange: OnValueChangeAny): PolicyDlgConv.PolicyUiAtoms {
    const forAtoms = PolicyDlgConv.forAtoms(policies);
    const dlgUiAtoms = PolicyDlgConv.createAtoms(forAtoms, onChange);
    const parser = new PolicyParser();

    console.log('%cDlg. useMemo to Policy.createUiAtoms', 'color: #f0f');
    const rv: PolicyDlgConv.PolicyUiAtoms = {
        ...dlgUiAtoms,
        original: policies,
        fromFile: forAtoms,
        changed: false,
        parser,
    };
    return rv;
}

function combineResultFromAtoms(dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms, get: Getter, set: Setter) {
    const dlgUi = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);
    const changed = !PolicyDlgConv.areTheSame(dlgUi, dlgUiAtoms.fromFile);
    dlgUiAtoms.changed = changed;
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
