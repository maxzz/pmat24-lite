import { atom } from "jotai";
import { PolicyAction } from "./9-policy-helpers";

export * from "./9-policy-helpers";

export const policyDialogOpenAtom = atom(false);

// Dialog data

export type PoliciesForAtoms = {
    policy: string;
    policy2: string;
    explanation: PolicyAction;
};
