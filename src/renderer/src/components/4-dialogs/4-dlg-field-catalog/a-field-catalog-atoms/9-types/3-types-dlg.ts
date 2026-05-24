import { type PrimitiveAtom } from "jotai";
import { type FceItem } from "./1-types-fce-atoms";

/**
 * Field catalog dialog in data
 */
export type FceDlgIn = {
    openItemPickerDlg: boolean;                     // select item from field catalog, i.e. not master field catalog
    dbid?: string | undefined;                      // dbid of the field catalog item to initially select
    showTxt: boolean;                               // show text fields only
    showPsw: boolean;                               // show password fields only
    outBoxAtom?: PrimitiveAtom<FceDlgOut | null>;   // selected item output atom
};

/**
 * Field catalog dialog output data
 */
export type FceDlgOut = {
    selectedItem: FceItem | undefined;
};
