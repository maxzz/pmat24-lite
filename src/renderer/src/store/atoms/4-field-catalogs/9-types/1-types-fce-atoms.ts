import { type PrimitiveAtom } from "jotai";
import { ValueLife, type CatalogFile, type CatalogItem } from "@/store/manifest";
import { type FileContent } from "@shared/ipc-types";
import { FldCatInData } from "./3-types-dlg";

// import { type PrimitiveAtom } from "jotai";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

export type FceItem = CatalogItem;

// FceAtoms

export type FceAtoms = {                        // Field Catalog Editor Atoms
    fileCnt: FileContent;                       // reference to existing file content or placeholder for new field catalog w/ flag newFile
    fceCtxAtom: PrimitiveAtom<FceCtx | null>;   // field catalog editor ui atoms; created when field catalog file selected at top level
    descriptor?: CatalogFile.Descriptor;
    items: PrimitiveAtom<FceItem[]>;
};

export type FceRoots = Record<string, FceAtoms>;

// FceCtx

export type FceCtx = { // Field Catalog Editor context
    inData: FldCatInData | null;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;

    nameAtom        /**/: PrimitiveAtom<string>;
    typeAtom        /**/: PrimitiveAtom<string>;
    valueAtom       /**/: PrimitiveAtom<string>;
    ownernoteAtom   /**/: PrimitiveAtom<string>;

    useItAtom       /**/: PrimitiveAtom<boolean>; // not used but required for Column4_Value component
    valueLifeAtom   /**/: PrimitiveAtom<ValueLife>;
};
