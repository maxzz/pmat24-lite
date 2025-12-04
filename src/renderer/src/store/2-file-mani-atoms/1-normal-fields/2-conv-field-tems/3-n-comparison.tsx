import { sameValueLife, type EditorField, type Mani } from "@/store/8-manifest";

// Comparison

function samePolicyStrings(from: Mani.FieldPolicy, to: Mani.FieldPolicy): boolean {
    const rv = (
        from.policy === to.policy &&
        from.policy2 === to.policy2 &&
        from.options === to.options
    );
    return rv;
}

export function areTheSame(from: EditorField.ForAtoms, to: EditorField.ForAtoms): boolean {
    const rv = (
        from.useIt === to.useIt &&
        from.label === to.label &&
        from.type === to.type &&
        from.dbname === to.dbname &&
        sameValueLife(from.valueLife, to.valueLife) &&
        samePolicyStrings(from.policies, to.policies) &&
        
        from.rfield === to.rfield &&
        from.rfieldUuid === to.rfieldUuid &&
        from.rfieldForm === to.rfieldForm
    );
    return rv;
}
