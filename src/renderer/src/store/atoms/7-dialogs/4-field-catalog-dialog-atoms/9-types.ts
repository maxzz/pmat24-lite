import { PrimitiveAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";

/**
 * Field catalog dialog in data
 */
export type FldCatInData = {
    dbid?: string | undefined;      // dbid of the field catalog item to initially select
    showTxt: boolean;               // show text fields only
    showPsw: boolean;               // show password fields only
    outBoxAtom?: PrimitiveAtom<FldCatOutData | null>; // selected item output atom
};

/**
 * Field catalog dialog output data
 */
export type FldCatOutData = {
    fldCatItem: CatalogItem | null; // selected item
};
