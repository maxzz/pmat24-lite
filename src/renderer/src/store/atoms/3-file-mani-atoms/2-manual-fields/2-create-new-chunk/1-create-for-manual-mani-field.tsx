import { createGuidWrapped, type Mani } from "@/store/manifest";

export function createForManualManiField(): Mani.Field {
    const rv: Mani.Field = {
        type: "edit",
        useit: true,
        displayname: 'No name',
        dbname: createGuidWrapped(),
    };
    return rv;
}
