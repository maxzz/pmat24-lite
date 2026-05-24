import { type Atom, atom } from "jotai";
import { type FceCtx, type FceItem } from "../9-types/1-types-fce-atoms";
import { FieldTyp } from "@/store/8-manifest";

//*********************************************************************************
// All field catalog items

const fldCatItemsAtom = atom<FceItem[]>([]); // Should not be used anymore

// Field catalog items split into text and password items

/*export*/ const fldCatTxtItemsAtom = atom<FceItem[]>(
    (get) => getFceItemsByType(get(fldCatItemsAtom), FieldTyp.edit),
);

/*export*/ const fldCatPswItemsAtom = atom<FceItem[]>(
    (get) => getFceItemsByType(get(fldCatItemsAtom), FieldTyp.psw),
);

// Field catalog item by dbname

/*export*/ const fldCatItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const items = get(fldCatItemsAtom);
            return findFceItem(items, dbid);
        }
    }
);

//*********************************************************************************
// utilities

function getFceItemsByType(items: FceItem[], fType: FieldTyp): FceItem[] {
    return items.filter((item) => item.fieldValue.fType === fType);
}

function findFceItem(items: FceItem[], dbid: string): FceItem | undefined {
    return items.find((item) => item.fieldValue.dbname === dbid);
}

function mruToString(items: FceItem[]) {
    return JSON.stringify(items.map((item) => `${JSON.stringify(item)}\n`), null, 4);
    //console.log('buildMruWItem', `\n${JSON.stringify(item)}\n\n`, mruToString(rv));
}

//*********************************************************************************
// utilities MRU

function deleteMruWItem(mru: FceItem[], delItem: FceItem): FceItem[] {
    return mru.filter((item) => item.fceMeta.uuid !== delItem.fceMeta.uuid);
}

function buildMruWithItem(mru: FceItem[], item: FceItem | undefined): FceItem[] {
    let rv = mru;
    if (item) {
        rv = deleteMruWItem(mru, item);
        rv.unshift(item);
        rv = rv.slice(0, mruSize);
    }
    return rv;
}

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

type MruForFcItemResult = {
    mruItems: FceItem[];
    thisFceItem: FceItem | undefined;
};

export const getMruForFcItemAtom = atom(
    (get) => {
        function fn(isPsw: boolean | undefined, dbname: string | undefined): MruForFcItemResult {
            const fceItem = get(fldCatItemAtom)(dbname);

            const mruItemsByType = get(isPsw ? mruFldCatPswItemsAtom : mruFldCatTxtItemsAtom);
            const mruItemsByType2 = buildMruWithItem(mruItemsByType, fceItem);

            return {
                mruItems: mruItemsByType2,
                thisFceItem: fceItem,
            };
        }
        return fn;
    }
);

//*********************************************************************************
// New MRU

const createMruScopedAtom = (fceCtx: FceCtx, isPsw: boolean): Atom<FceItem[]> => {
    const rv = atom(
        (get) => {
            const fType = isPsw ? FieldTyp.psw : FieldTyp.edit;
            const items = get(fceCtx.fceAtoms.allAtom);

            const rv = items
                .filter((item) => item.fieldValue.fType === fType)
                .sort((a, b) => get(b.fceMeta.mruAtom) - get(a.fceMeta.mruAtom)) // descending i.e. latest date first
                .slice(0, mruSize); // reverse // assign MRU backwards to have them initially first as latest

            return rv;
        }
    );
    return rv;
};

//TODO: fceMeta.mru should be atom defined outside manifest library, so it will be reactive to track changes in createMruScopedAtom
