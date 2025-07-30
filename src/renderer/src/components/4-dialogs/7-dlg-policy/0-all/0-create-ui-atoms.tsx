import { type OnValueChangeAny, debounce } from "@/utils";
import { type Mani } from "@/store/manifest";
import { PolicyDlgConv, type PolicyDlgTypes } from "./0-conv";
import { PolicyParser } from "@/store/manifest/3-policy-io";

export function createUiAtoms(policies: Mani.FieldPolicy, onChange: OnValueChangeAny): PolicyDlgTypes.PolicyUiCtx {
    const forAtoms = PolicyDlgConv.forAtoms(policies);
    const dlgUiAtoms = PolicyDlgConv.createAtoms(forAtoms, onChange);
    const parser = new PolicyParser();

    //console.log('%cDlg. useMemo to Policy.createUiAtoms', 'color: #f0f', { policies });

    const rv: PolicyDlgTypes.PolicyUiCtx = {
        ...dlgUiAtoms,
        original: policies,
        fromFile: forAtoms,
        changed: false,
        parser,
    };
    return rv;
}

function onChangeWithScope(dlgUiAtoms: PolicyDlgTypes.PolicyUiCtx, get: Getter, set: Setter) {
    const dlgUi = PolicyDlgConv.fromAtoms(dlgUiAtoms, { get });
    const changed = !PolicyDlgConv.areTheSame(dlgUi, dlgUiAtoms.fromFile);
    dlgUiAtoms.changed = changed;
}

export const debouncedOnChangeWithScope = debounce(onChangeWithScope);
