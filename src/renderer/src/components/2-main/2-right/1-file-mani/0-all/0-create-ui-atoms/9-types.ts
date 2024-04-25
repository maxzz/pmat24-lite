import { TableRowAtoms } from "./1-fields-atoms";
import { SubitAtoms } from "./2-submit-atoms";
import { PolicyAtoms } from "./3-policy-atoms";
import { FormOptionsAtoms } from "./4-options-atoms";

export type FormAtoms = {
    tableRowAtoms: TableRowAtoms;
    subitAtoms: SubitAtoms;
    policyAtoms: PolicyAtoms;
    optionsAtoms: FormOptionsAtoms;
};
