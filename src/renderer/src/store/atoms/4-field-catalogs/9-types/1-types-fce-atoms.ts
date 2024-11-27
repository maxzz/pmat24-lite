import { type PrimitiveAtom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type ValueLife, type CatalogItemMeta } from "@/store/manifest";
import { type FceDlgIn } from "./3-types-dlg";
import { type OnValueChangeParams } from "@/util-hooks";

export type FceItemEditor = {
    selectedView: boolean;
    selectedDlg: boolean;
};

export type FceItemValue = Prettify<
    & {
        displayname: string;
        dbname: string;
        ownernote: string;
    }
    & ValueLife
>;

// export type FceItem = Omit<FceItem0, 'editor'> & {editor: FceItemEditor};
export type FceItem = {
    fieldValue: FceItemValue;                       // current value for editing
    beforeEdit: FceItemValue;                       // value before editing
    fceMeta: CatalogItemMeta;                      // metadata
    editor: FceItemEditor;                         // editor state
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
    showText: boolean;
    showPassword: boolean;
    search: string;
    ascending: boolean;
};

export type FceItemsAtoms = {                       // Field Catalog Editor items
    descAtom: PrimitiveAtom<string>;                // field catalog descriptor. i.e. id from CatalogFile.Descriptor
    shownAtom: PrimitiveAtom<FceItem[]>;            // field catalog items shown on screen
    allAtom: PrimitiveAtom<FceItem[]>;              // all field catalog items from file
    fceFilterOptions: FceFilterOptions;             // valtio proxy: filter options to apply on all items and get shown items
};

export type FceAtoms = Prettify<                    // Field Catalog Editor Atoms
    {
        fileUs: FileUs;                             // reference to existing file content or placeholder for new field catalog w/ flag newFile
        viewFceCtx: FceCtx | undefined;             // field catalog editor ui atoms; created when field catalog file selected at top level
    }
    & FceItemsAtoms
>;

// FceCtx

export type FceCtx = {                              // Field Catalog Editor context
    inData: FceDlgIn | undefined;
    fceAtoms: FceAtoms;
    isDlgCtx: boolean;                              // true if this is a field catalog dialog context, not a field catalog view context
    isMaster: boolean;                              // true if this is a master field catalog
    selectedIdxStoreAtom: PrimitiveAtom<number>;
    selectedItemAtom: PrimitiveAtom<FceItem | undefined>;
    scrollTo: number;                               // Nun: index of selected item to scroll when view rendered. Do later or never.
    focusGridAtom: PrimitiveAtom<boolean>;          // true if grid should be focused, and reset after focus set by grid
    fcePropAtoms: FcePropAtoms;
    onItemDoubleClick?: (item: FceItem) => void;
    onChangeFcePropValue: OnChangeFcePropValue;     // TODO: callback for newly created itmes, but we don't really need it
};

// Callback

export type OnChangeFcePropParams = Prettify<{ name: string; fceCtx: FceCtx; } & OnValueChangeParams<string | ValueLife>>;
export type OnChangeFcePropValue = (props: OnChangeFcePropParams) => void;

// Misc

export const defaultFcName = 'field_catalog.dpn';
