import { atom } from "jotai";
import { type FceItem } from "../9-types/1-types-fce-atoms";
import { fldCatItemAtom, fldCatPswItemsAtom, fldCatTxtItemsAtom } from "../0-all-items-atom";

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

function buildMruWItem(mru: FceItem[], item: FceItem | undefined): FceItem[] {
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
            
            let catalogItemsByType = get(isPsw ? mruFldCatPswItemsAtom : mruFldCatTxtItemsAtom);
            catalogItemsByType = buildMruWItem(catalogItemsByType, fceItem);

            return {
                catalogItemsByType,
                catalogItem: fceItem,
            };
        }
        return fn;
    }
);
