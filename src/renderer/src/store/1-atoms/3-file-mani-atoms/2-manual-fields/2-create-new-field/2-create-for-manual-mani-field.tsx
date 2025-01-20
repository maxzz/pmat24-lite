import { type Mani } from "@/store/manifest";

export function createForManualManiField(): Mani.Field {
    const rv: Mani.Field = {
        type: "edit",
        displayname: '',
        dbname: 'TODO: guid',
    };
    return rv;
}
