import { atom } from "jotai";
import { FieldTyp } from "@/store/8-manifest";
import { type FceItem } from "../9-types";
import { getRootFceAtoms, hasRootFceAtoms } from "../1-fc-file-atoms";

export const txtMruAtom = atom<FceItem[]>([]);
export const pswMruAtom = atom<FceItem[]>([]);
export const emptyMruAtom = atom<FceItem[]>([]); // This is used for fields that are not part of field catalog, i.e. checkboxes, buttons, etc.

export const mruSize = 7;

function buildMruList(mru: FceItem[], doPsw: boolean, { get }: GetOnly): FceItem[] {
    const fType = doPsw ? FieldTyp.psw : FieldTyp.edit;

    const rv = mru
        .filter((item) => item.fieldValue.fType === fType)
        .sort((a, b) => get(b.fceMeta.mruAtom) - get(a.fceMeta.mruAtom)) // descending i.e. latest date first
        .slice(0, mruSize); // reverse // assign MRU backwards to have them initially first as latest

    return rv;
}

export const doInitMruAtom = atom(null,
    (get, set) => {
        if (!hasRootFceAtoms()) {
            set(txtMruAtom, []);
            set(pswMruAtom, []);
            return;
        }

        const all = get(getRootFceAtoms().allAtom);
        const getOnly = { get };

        const txtItems = buildMruList(all, false, getOnly);
        const pswItems = buildMruList(all, true, getOnly);

        set(txtMruAtom, txtItems);
        set(pswMruAtom, pswItems);

        // print_AllItems(txtItems, pswItems);
    }
);

export const doAddMruItemAtom = atom(null,
    (get, set, { item }: { item: FceItem; }) => {
        const doPsw = item.fieldValue.fType === FieldTyp.psw;

        let newItems = doPsw ? get(pswMruAtom) : get(txtMruAtom);
        newItems.unshift(item);
        newItems = newItems.slice(0, mruSize);

        set(doPsw ? pswMruAtom : txtMruAtom, newItems);
    }
);

export const doDeleteMruItemAtom = atom(null,
    (get, set, { item }: { item: FceItem; }) => {
        const doPsw = item.fieldValue.fType === FieldTyp.psw;

        let newItems = doPsw ? get(pswMruAtom) : get(txtMruAtom);
        newItems = newItems.filter((item) => item.fceMeta.uuid !== item.fceMeta.uuid);

        set(doPsw ? pswMruAtom : txtMruAtom, newItems);
    }
);

//

export function findFceItem(items: FceItem[], dbid: string | undefined): FceItem | undefined {
    return items.find((item) => item.fieldValue.dbname === dbid);
}


function print_AllItems(txtItems: FceItem[], pswItems: FceItem[]) {
    print_FceItems('txtMruItems', txtItems);
    print_FceItems('pswMruItems', pswItems);
}

export function print_FceItems(label: string, items: FceItem[]) {
    console.log(`${label}:`);
    items.forEach(
        (item, idx) => console.log(`${idx}:`, { dbname: item.fieldValue.dbname, displayname: item.fieldValue.displayname })
    );
}
