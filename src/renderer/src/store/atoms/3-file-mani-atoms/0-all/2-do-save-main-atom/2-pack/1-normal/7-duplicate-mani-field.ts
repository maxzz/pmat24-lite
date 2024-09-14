import { Mani } from "pm-manifest";

export function duplicateManiField(field: Mani.Field): Mani.Field {
    const rv = JSON.parse(JSON.stringify(field));
    return rv;
}
