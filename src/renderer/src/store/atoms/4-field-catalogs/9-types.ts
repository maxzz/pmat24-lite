// import { type PrimitiveAtom } from "jotai";
import { type CatalogFile, type CatalogItem } from "@/store/manifest";

// export type FceItem = CatalogItem & { // Field Catalog Editor item
//     editor?: {
//         selectedAtom: PrimitiveAtom<boolean>;
//     }
// };

//export type FceItems = FceItem[];

export type FceItem = CatalogItem;

export type FceRoot = {
    descriptor?: CatalogFile.Descriptor;
    items: FceItem[];
};
