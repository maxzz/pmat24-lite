import { atom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FceItem } from "../9-types";

export const txtMruAtom = atom<FceItem[]>([]);
export const pswMruAtom = atom<FceItem[]>([]);

const mruSize = 7;

function buildMruList(mru: FceItem[], doPsw: boolean): FceItem[] {
    const fType = doPsw ? FieldTyp.psw : FieldTyp.edit;

    const rv = mru
        .filter((item) => item.fieldValue.fType === fType)
        .sort((a, b) => b.fceMeta.mru - a.fceMeta.mru) // descending i.e. latest date first
        .slice(0, mruSize); // reverse // assign MRU backwards to have them initially first as latest

    return rv;
}

export const doInitMruAtom = atom(null,
    (get, set, { mru }: { mru: FceItem[]; }) => {

        const txtItems = buildMruList(mru, false);
        const pswItems = buildMruList(mru, true);

        set(txtMruAtom, txtItems);
        set(pswMruAtom, pswItems);
    }
);

export const doAddMruItemAtom = atom(null,
    (get, set, { mru, item }: { mru: FceItem[]; item: FceItem }) => {
        const doPsw = item.fieldValue.fType === FieldTyp.psw;
        
        let newItems = doPsw ? get(pswMruAtom) : get(txtMruAtom);
        newItems.unshift(item);
        newItems = newItems.slice(0, mruSize);

        set(doPsw ? pswMruAtom : txtMruAtom, newItems);
    }
);

export const doDeleteMruItemAtom = atom(null,
    (get, set, { mru, item }: { mru: FceItem[]; item: FceItem }) => {
        const doPsw = item.fieldValue.fType === FieldTyp.psw;
        
        let newItems = doPsw ? get(pswMruAtom) : get(txtMruAtom);
        newItems = newItems.filter((item) => item.fceMeta.uuid !== item.fceMeta.uuid);

        set(doPsw ? pswMruAtom : txtMruAtom, newItems);
    }
);
