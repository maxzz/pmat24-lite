import { type Atomize } from "@/utils";
import { type Mani } from "@/store/manifest";
import { type RowInputState } from "@/ui";
import { type PolicyParser } from "@/store/manifest/3-policy-io";

export namespace PolicyDlgTypes {

    export type ForAtoms = {
        enabled: boolean;                   // Enable password policy

        constrainSet: string;               // ConstrainSet; predefined rule
        constrainSet0: string;              // ui helper field: last ConstrainSet in case if custom is selected
        isCustom: boolean;                  // ui helper field: is custom rule selected but custom field can be empty
        custom: string;                     // customRule

        minLen: RowInputState;              // min password length
        maxLen: RowInputState;              // max password length

        explanation: string;                // explanation of policy
        errorText: string;                  // error text for custom rule

        testPassword: string;               // text to verify policy generation or for generated password
        testVerified: '0' | '1' | '';       // result of testPassword verification: 0 - failed, 1 - ok, '' - not tested

        constrainPsw: string;               // ConstrainsPsw
        useAs: string;                      // UseAs; by user / by system
        fakeOptions: string;                // Fake options from manifest but not used, so we just preserve it
    };

    export type ForAtomsAtomized = Atomize<ForAtoms>;

    export type PolicyUiCtx = Prettify<
        & ForAtomsAtomized
        & {
            original: Mani.FieldPolicy;     // original state to allow on/off checkbox
            fromFile: ForAtoms;             // original state to compare with
            changed: boolean;               // state from atoms is different from original state
            parser: PolicyParser;           // parser for policy
        }
    >;
}
