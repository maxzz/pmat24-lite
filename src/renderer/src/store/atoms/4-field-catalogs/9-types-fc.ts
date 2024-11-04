import { type PrimitiveAtom } from "jotai";
import { type CatalogFile, type CatalogItem } from "@/store/manifest";
import { type FileContent } from "@shared/ipc-types";
import { type FceCtx } from "./2-fc-dialog-atoms";

// import { type PrimitiveAtom } from "jotai";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

export type FceItem = CatalogItem;

export type FceRoot = {
    fileCnt: FileContent;                       // reference to existing file content or placeholder for new field catalog w/ flag newFile
    fceAtomsAtom: PrimitiveAtom<FceCtx | null>; // field catalog editor ui atoms; created when field catalog file selected at top level
    descriptor?: CatalogFile.Descriptor;
    items: PrimitiveAtom<FceItem[]>;
};

export type FceRoots = Record<string, FceRoot>;
