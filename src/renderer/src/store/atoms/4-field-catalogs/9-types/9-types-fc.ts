import { type PrimitiveAtom } from "jotai";
import { type CatalogFile, type CatalogItem } from "@/store/manifest";
import { type FileContent } from "@shared/ipc-types";
import { type FceCtx } from "./9-types-ctx";

// import { type PrimitiveAtom } from "jotai";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

export type FceItem = CatalogItem;

export type FceAtoms = {                        // Field Catalog Editor Atoms
    fileCnt: FileContent;                       // reference to existing file content or placeholder for new field catalog w/ flag newFile
    fceCtxAtom: PrimitiveAtom<FceCtx | null>;   // field catalog editor ui atoms; created when field catalog file selected at top level
    descriptor?: CatalogFile.Descriptor;
    items: PrimitiveAtom<FceItem[]>;
};

export type FceRoots = Record<string, FceAtoms>;
