import { type PrimitiveAtom } from "jotai";
import { type ValueLife, type CatalogFile, type CatalogItem } from "@/store/manifest";
import { type FileContent } from "@shared/ipc-types";
import { FceDlgIn, type Fce0DlgIn } from "./3-types-dlg";
import { FileUs } from "@/store/store-types";

// import { type PrimitiveAtom } from "jotai";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

export type FceItem = CatalogItem;

// FceAtoms

export type Fce0Atoms = {                           // Field Catalog Editor Atoms
    fileCnt: FileContent;                           // reference to existing file content or placeholder for new field catalog w/ flag newFile
    fceCtxAtom: PrimitiveAtom<Fce0Ctx | null>;      // field catalog editor ui atoms; created when field catalog file selected at top level
    descriptor?: CatalogFile.Descriptor;
    items: PrimitiveAtom<FceItem[]>;
};

export type Fce0Roots = Record<string, Fce0Atoms>;

// FceCtx

export type Fce0Ctx = { // Field Catalog Editor context
    inData: Fce0DlgIn | null;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;

    nameAtom        /**/: PrimitiveAtom<string>;
    typeAtom        /**/: PrimitiveAtom<string>;
    valueAtom       /**/: PrimitiveAtom<string>;
    ownernoteAtom   /**/: PrimitiveAtom<string>;

    useItAtom       /**/: PrimitiveAtom<boolean>;   // not used but required for Column4_Value component
    valueLifeAtom   /**/: PrimitiveAtom<ValueLife>;
};

// v1

// FceAtoms

export type FcePropAtoms = {                        // Field Catalog Editor Atoms
    nameAtom        /**/: PrimitiveAtom<string>;
    typeAtom        /**/: PrimitiveAtom<string>;
    valueAtom       /**/: PrimitiveAtom<string>;
    ownernoteAtom   /**/: PrimitiveAtom<string>;

    useItAtom       /**/: PrimitiveAtom<boolean>;   // not used but required for Column4_Value component
    valueLifeAtom   /**/: PrimitiveAtom<ValueLife>;
};

export type FceItemsAtoms = {                       // Field Catalog Editor items
    descAtom: PrimitiveAtom<string>;                // field catalog descriptor. i.e. id from CatalogFile.Descriptor
    items: PrimitiveAtom<FceItem[]>;
};

export type FceAtoms = Prettify<                    // Field Catalog Editor Atoms
    {
        fileUs: FileUs;                             // reference to existing file content or placeholder for new field catalog w/ flag newFile
        viewFceCtx: FceCtx | undefined;             // field catalog editor ui atoms; created when field catalog file selected at top level
    }
    & FceItemsAtoms
    & FcePropAtoms
>;

export type FceRoots = Record<string, Fce0Atoms>;

// FceCtx

export type FceCtx = { // Field Catalog Editor context
    inData: FceDlgIn | null;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;

};
