import { type PrimitiveAtom } from "jotai";
import { type CatalogFile, type CatalogItem } from "@/store/manifest";
import { type FileContent } from "@shared/ipc-types";

// import { type PrimitiveAtom } from "jotai";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

export type FceItem = CatalogItem;

export type FceRoot = {
    fileCnt: FileContent | null;
    descriptor?: CatalogFile.Descriptor;
    items: PrimitiveAtom<FceItem[]>;
};

export type FceRoots = Record<string, FceRoot>;
