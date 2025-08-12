import { Mani } from "pm-manifest";

/**
 * Mani.Field has no nested objects, so we can use destructuring to copy the object
 * instead of JSON.parse(JSON.stringify(field)).
 * Note: We don't care about chgpolopts (FieldPolicyOptions) because it's not used in the editor
 * and initially should not exist at all.
 */
export function duplicateManiField({ field, useIt }: { field: Mani.Field; useIt?: boolean; }): Mani.Field {
    const rv = {
        ...field
    };

    if (useIt !== undefined) {
        rv.useit = useIt;
    }
    
    return rv;
}
