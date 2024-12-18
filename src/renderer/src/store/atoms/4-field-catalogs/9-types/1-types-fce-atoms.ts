import { type Atom, type PrimitiveAtom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type ValueLife, type CatalogItemMeta } from "@/store/manifest";
import { type FceDlgIn } from "./3-types-dlg";
import { type OnValueChangeParams } from "@/util-hooks";

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
    isSelectedInView: boolean;
    isSelectedInDlg: boolean;
};

export type FceItemMeta = Prettify<
    & CatalogItemMeta
    & {
        mruAtom: PrimitiveAtom<number>;
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
    nameAtom      /**/: PrimitiveAtom<string>;
    valueAtom     /**/: PrimitiveAtom<string>;
    ownernoteAtom /**/: PrimitiveAtom<string>;

    useItAtom     /**/: PrimitiveAtom<boolean>;     // not used but required for Column4_Value component
    valueLifeAtom /**/: PrimitiveAtom<ValueLife>;
};

export type FceFilterOptions = {
    search: string;                                 // Search string
    showText: boolean;                              // Show text fields
    showPassword: boolean;                          // Show password fields
    ascending: boolean | undefined;                 // Undefined means unsorted, true means ascending, false means descending
};

export type FceItemsAtoms = {                       // Field Catalog Editor items
    aboutAtom: PrimitiveAtom<string>;               // Field catalog descriptor. i.e. id from CatalogFile.Descriptor
    allAtom: PrimitiveAtom<FceItem[]>;              // All field catalog items from file
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
    isDlgCtx: boolean;                              // True if this is a field catalog dialog context, not a field catalog view context
    isMaster: boolean;                              // True if this is a master field catalog

    selectedIdxStoreAtom: PrimitiveAtom<number>;
    selectedItemAtom: PrimitiveAtom<FceItem | undefined>; // Used for dialog close, scroll to, props editor, add and delete operations.
    hasSelectedItemAtom: Atom<boolean>;             // True if there is a selected item
    scrollTo: number;                               // Nun: index of selected item to scroll when view rendered. Do later or never.
    focusGridAtom: PrimitiveAtom<boolean>;          // True if grid should be focused, and reset after focus set by grid.

    filterAtom: PrimitiveAtom<FceFilterOptions>;    // filter options to apply on all items and get fceAtoms.shownAtom items
    showAtom: Atom<FceItem[]>;                      // readonly: field catalog items shown on screen

    fcePropAtoms: FcePropAtoms;

    onItemDoubleClick?: (item: FceItem) => void;
    onChangeFcePropValue: OnChangeFcePropValue;     // TODO: callback for newly created itmes, but we don't really need it
};

// Callback

export type OnChangeFcePropParams = Prettify<{ name: string; fceCtx: FceCtx; } & OnValueChangeParams<string | ValueLife>>;
export type OnChangeFcePropValue = (props: OnChangeFcePropParams) => void;

// Misc

export const defaultFcName = 'field_catalog.dpn';
