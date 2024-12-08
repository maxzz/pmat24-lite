import { atom, type Getter, type Setter } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FceItem } from "../9-types";
import { getRootFceAtoms, hasRootFceAtoms } from "../1-fc-file-atoms";

export const txtMruAtom = atom<FceItem[]>([]);
export const pswMruAtom = atom<FceItem[]>([]);

const mruSize = 7;

function buildMruList(mru: FceItem[], doPsw: boolean, get: Getter, set: Setter): FceItem[] {
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

        const txtItems = buildMruList(all, false, get, set);
        const pswItems = buildMruList(all, true, get, set);

        console.log('txtItems', txtItems);
        console.log('pswItems', pswItems);

        set(txtMruAtom, txtItems);
        set(pswMruAtom, pswItems);
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