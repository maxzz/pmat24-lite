import { createGuidWrapped, type Mani } from "@/store/manifest";

export function createForManualManiField(password: boolean): Mani.Field {
    const rv: Mani.Field = {
        type: "edit",
        password,
        useit: true,
        displayname: 'No name',
        dbname: createGuidWrapped(),
    };
    return rv;
}
