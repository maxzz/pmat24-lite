import { type Getter, type Setter } from "jotai";
import { type OnValueChangeAny } from "@/util-hooks";
import { type Mani } from "@/store/manifest";
import { PolicyDlgConv, type PolicyDlgTypes } from "./0-conv";
import { PolicyParser } from "@/store/manifest/3-policy-io";
import { debounce } from "@/utils";

export function createUiAtoms(policies: Mani.FieldPolicy, onChange: OnValueChangeAny): PolicyDlgTypes.PolicyUiAtoms {
    const forAtoms = PolicyDlgConv.forAtoms(policies);
    const dlgUiAtoms = PolicyDlgConv.createAtoms(forAtoms, onChange);
    const parser = new PolicyParser();

    //console.log('%cDlg. useMemo to Policy.createUiAtoms', 'color: #f0f', { policies });
    
    const rv: PolicyDlgTypes.PolicyUiAtoms = {
        ...dlgUiAtoms,
        original: policies,
        fromFile: forAtoms,
        changed: false,
        parser,
    };
    return rv;
}

function onChangeWithScope(dlgUiAtoms: PolicyDlgTypes.PolicyUiAtoms, get: Getter, set: Setter) {
    const dlgUi = PolicyDlgConv.fromAtoms(dlgUiAtoms, get, set);
    const changed = !PolicyDlgConv.areTheSame(dlgUi, dlgUiAtoms.fromFile);
    dlgUiAtoms.changed = changed;
}

export const onChangeWithScopeDebounced = debounce(onChangeWithScope);
