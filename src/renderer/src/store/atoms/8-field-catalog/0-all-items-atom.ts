import { atom } from "jotai";
import { CatalogItem, buildCatalogMetaFromNames } from "@/store/manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";

// All field catalog items

export const fldCatItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);

// Field catalog items split into text and password items

export const fldCatTxtItemsAtom = atom<CatalogItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => !item.password),
);

export const fldCatPswItemsAtom = atom<CatalogItem[]>(
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
