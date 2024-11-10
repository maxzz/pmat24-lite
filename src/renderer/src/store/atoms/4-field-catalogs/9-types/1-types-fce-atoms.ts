import { type PrimitiveAtom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type ValueLife, type CatalogItem } from "@/store/manifest";
import { type FileContent } from "@shared/ipc-types";
import { type FceDlgIn } from "./3-types-dlg";

// import { type PrimitiveAtom } from "jotai";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

export type FceItem = CatalogItem;

export const defaultFcName = 'field_catalog.dpn';

// FceAtoms

export type FcePropAtoms = {                        // Field Catalog Editor Atoms
    nameAtom      /**/: PrimitiveAtom<string>;
    typeAtom      /**/: PrimitiveAtom<string>;
    valueAtom     /**/: PrimitiveAtom<string>;
    ownernoteAtom /**/: PrimitiveAtom<string>;

    useItAtom     /**/: PrimitiveAtom<boolean>;     // not used but required for Column4_Value component
    valueLifeAtom /**/: PrimitiveAtom<ValueLife>;
};

export type FceItemsAtoms = {                       // Field Catalog Editor items
    descAtom: PrimitiveAtom<string>;                // field catalog descriptor. i.e. id from CatalogFile.Descriptor
    itemsAtom: PrimitiveAtom<FceItem[]>;
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
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    fcePropAtoms: FcePropAtoms;
    onItemDoubleClick?: (item: FceItem) => void;
};
