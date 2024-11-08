import { type PrimitiveAtom } from "jotai";
import { type FceItem, type Fce0Atoms } from "./1-types-fce-atoms";

/**
 * Field catalog dialog in data
 */
export type Fce0InData = {
    fceAtoms: Fce0Atoms;             // field catalog editor atoms exist when open for dialog
    dbid?: string | undefined;      // dbid of the field catalog item to initially select
    showTxt: boolean;               // show text fields only
    showPsw: boolean;               // show password fields only
    outBoxAtom?: PrimitiveAtom<Fce0OutData | null>; // selected item output atom
};

/**
 * Field catalog dialog output data
 */
export type Fce0OutData = {
    selectedItem: FceItem | null; // selected item
};
