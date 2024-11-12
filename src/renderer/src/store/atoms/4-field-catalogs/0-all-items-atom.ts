import { atom } from "jotai";
import { type FceItem } from "./9-types/1-types-fce-atoms";

// All field catalog items

const fldCatItemsAtom = atom<FceItem[]>([]); // Should not be used anymore

// Field catalog items split into text and password items

export const fldCatTxtItemsAtom = atom<FceItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => !item.password),
);

export const fldCatPswItemsAtom = atom<FceItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => !!item.password),
);

// Field catalog item by dbname

export const fldCatItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(fldCatItemsAtom);
            const rv = all.find((item) => item.dbname === dbid);
            return rv;
        }
    }
);
