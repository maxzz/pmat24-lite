import { atom } from "jotai";
import { type FceItem } from "./9-types/1-types-fce-atoms";
// import { buildCatalogMetaFromNames } from "@/store/manifest";
// import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
// import { addReactiveState } from "./1-fc-file-atoms/2-create-fce-atoms";

// All field catalog items

export const fldCatItemsAtom = atom<FceItem[]>(
    //addReactiveState(buildCatalogMetaFromNames(catalogTestNames).items)
    []
);

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
