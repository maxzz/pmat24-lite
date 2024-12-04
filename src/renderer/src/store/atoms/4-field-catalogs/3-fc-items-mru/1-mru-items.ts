import { atom } from "jotai";
import { type FceItem } from "../9-types/1-types-fce-atoms";
import { FieldTyp } from "@/store/manifest";

//*********************************************************************************
// All field catalog items

const fldCatItemsAtom = atom<FceItem[]>([]); // Should not be used anymore

// Field catalog items split into text and password items

/*export*/ const fldCatTxtItemsAtom = atom<FceItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => item.fieldValue.fType === FieldTyp.edit),
);

/*export*/ const fldCatPswItemsAtom = atom<FceItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => item.fieldValue.fType === FieldTyp.psw),
);

// Field catalog item by dbname

/*export*/ const fldCatItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(fldCatItemsAtom);
            const rv = all.find((item) => item.fieldValue.dbname === dbid);
            return rv;
        }
    }
);

//*********************************************************************************
// MRU - most recently used items

const mruSize = 7;

const mruFldCatTxtItemsAtom = atom(
    (get) => {
        let all = get(fldCatTxtItemsAtom);
        all = all.slice(0, mruSize);
        //console.log('all txt', mruToString(all));
        return all;
    },
);

const mruFldCatPswItemsAtom = atom(
    (get) => {
        let all = get(fldCatPswItemsAtom);
        all = all.slice(0, mruSize);
        //console.log('all psw', mruToString(all));
        return all;
    },
);

function deleteMruWItem(mru: FceItem[], delItem: FceItem): FceItem[] {
    return mru.filter((item) => item.fceMeta.uuid !== delItem.fceMeta.uuid);
}

function buildMruWithItem(mru: FceItem[], item: FceItem | undefined): FceItem[] {
    let rv = mru;
    if (item) {
        rv = deleteMruWItem(mru, item);
        rv.unshift(item);
        rv.length > mruSize && rv.pop();
    }
    return rv;
}

export const getMruFldCatForItemAtom = atom(
    (get) => {
        function fn(isPsw: boolean | undefined, dbname: string | undefined) {
            const fceItem = get(fldCatItemAtom)(dbname);
            
            const mruItemsByType = get(isPsw ? mruFldCatPswItemsAtom : mruFldCatTxtItemsAtom);
            const mruItemsByType2 = buildMruWithItem(mruItemsByType, fceItem);

            return {
                catalogItemsByType: mruItemsByType2,
                catalogItem: fceItem,
            };
        }
        return fn;
    }
);

//*********************************************************************************
