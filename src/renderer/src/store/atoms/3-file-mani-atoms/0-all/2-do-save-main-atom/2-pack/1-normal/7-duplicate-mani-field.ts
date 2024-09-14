import { Mani } from "pm-manifest";

/**
 * Mani.Field has no nested objects, so we can use destructuring to copy the object
 * instead of JSON.parse(JSON.stringify(field)).
 * Note: We don't care about chgpolopts (FieldPolicyOptions) because it's not used in the editor
 * and initially should not exist at all.
 */
export function duplicateManiField(field: Mani.Field): Mani.Field {
    const rv = {
        ...field
    };
    return rv;
}
