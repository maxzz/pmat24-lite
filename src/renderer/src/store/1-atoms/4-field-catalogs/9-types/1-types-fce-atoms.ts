import { type Atom, type PrimitiveAtom as PAtom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type ValueLife, type CatalogItemMeta } from "@/store/manifest";
import { type FceDlgIn } from "./3-types-dlg";
import { type OnValueChangeParams } from "@/utils";

// FceItem

export type FceItemValue = Prettify<
    & {
        displayname: string;
        dbname: string;
        ownernote: string;
    }
    & ValueLife
>;

export type FceItemEditor = {
    isSelectedInView: boolean;                      // True if this item is selected in view or main FC dialog
    isSelectedInPicker: boolean;                    // True if this item is selected in the select(picker) dialog
};

export type FceItemMeta = Prettify<
    & CatalogItemMeta
    & {
        mruAtom: PAtom<number>;
    }
>;

export type FceItem = {
    fieldValue: FceItemValue;                       // reactive valtio proxy: current value for editing
    beforeEdit: FceItemValue;                       // non-reactive: value before editing
    fceMeta: FceItemMeta;                           // metadata
    editor: FceItemEditor;                          // reactive valtio proxy: editor state
};

// FceAtoms

export type FcePropAtoms = {                        // Field Catalog Editor Atoms
    dispNameAtom: PAtom<string>;                    // human display name
    ownernoteAtom: PAtom<string>;                   // description

    useItAtom: PAtom<boolean>;                      // not used but required for Column4_Value component
    valueLifeAtom: PAtom<ValueLife>;
};

export type FceFilterOptions = {
    search: string;                                 // Search string
    showText: boolean;                              // Show text fields
    showPassword: boolean;                          // Show password fields
    ascending: boolean | undefined;                 // Undefined means unsorted, true means ascending, false means descending
};

export type FceItemsAtoms = {                       // Field Catalog Editor items
    aboutAtom: PAtom<string>;                       // Field catalog descriptor. i.e. id from CatalogFile.Descriptor
    allAtom: PAtom<FceItem[]>;                      // All field catalog items from file
};

export type FceAtoms = Prettify<                    // Field Catalog Editor Atoms
    {
        fileUs: FileUs;                             // reference to existing file content or placeholder for new field catalog w/ flag newFile
        viewFceCtx: FceCtx | undefined;             // field catalog editor ui atoms; created when field catalog file selected at top level
    }
    & FceItemsAtoms
>;

// FceCtx

export type FceCtx = {                              // Field Catalog Editor context for view or dialog
    inData: FceDlgIn | undefined;                   // Data for dialog
    fceAtoms: FceAtoms;                             // Back reference to fcxCtx holder

    isPicker: boolean;                              // True if this context is for FC picker (select FC item) dialog, i.e. not FC view or main dialog.
    isMaster: boolean;                              // True if this is a master field catalog; but now we support only one master field catalog

    selectedIdxStoreAtom: PAtom<number>;            // This should be set interanally only from doSelectIdxAtom and similar atoms and anything else for read only. for set use doSelectIdxAtom
    selectedItemAtom: PAtom<FceItem | undefined>;   // Used for dialog close, scroll to, props editor, add and delete operations.
    hasSelectedItemAtom: Atom<boolean>;             // True if there is a selected item
    scrollTo: number;                               // Nun: index of selected item to scroll when view rendered. Do later or never.
    focusGridAtom: PAtom<boolean>;                  // True if grid should be focused, and reset after focus set by grid.

    filterAtom: PAtom<FceFilterOptions>;            // filter options to apply on all items and get fceAtoms.shownAtom items
    shownAtom: Atom<FceItem[]>;                     // readonly: field catalog items shown on screen

    fcePropAtoms: FcePropAtoms;

    onItemDoubleClick?: (item: FceItem) => void;
    onChangeFcePropValue: OnChangeFcePropValue;     // TODO: callback for newly created itmes, but we don't really need it
};

// Callback

export type OnChangeFcePropParams = Prettify<{ name: string; fceCtx: FceCtx; } & OnValueChangeParams<string | ValueLife>>;
export type OnChangeFcePropValue = (props: OnChangeFcePropParams) => void;

// Misc

export const defaultFcName = 'field_catalog.dpn';
