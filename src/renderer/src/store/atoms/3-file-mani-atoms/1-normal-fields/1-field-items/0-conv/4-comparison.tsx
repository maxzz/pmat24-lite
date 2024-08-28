import { type Mani, type ValueLife } from "@/store/manifest";
import { type NormalField } from "./9-types";

// Comparison

function theSameValue(from: ValueLife, to: ValueLife): boolean {
    const rv = (
        from.value === to.value &&
        from.valueAs === to.valueAs &&
        from.isRef === to.isRef
    );
    return rv;
}

function theSamePolicyStrings(from: Mani.FieldPolicy, to: Mani.FieldPolicy): boolean {
    const rv = (
        from.policy === to.policy &&
        from.policy2 === to.policy2 &&
        from.options === to.options
    );
    return rv;
}

export function areTheSame(from: NormalField.ForAtoms, to: NormalField.ForAtoms): boolean {
    const rv = (
        from.useIt === to.useIt &&
        from.label === to.label &&
        from.type === to.type &&
        from.dbname === to.dbname &&
        theSameValue(from.valueLife, to.valueLife) &&
        from.valueLife.valueAs === to.valueLife.valueAs &&
        theSamePolicyStrings(from.policies, to.policies)
    );
    return rv;
}