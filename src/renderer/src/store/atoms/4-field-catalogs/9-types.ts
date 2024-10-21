import { PrimitiveAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";

export type FceItem = CatalogItem & { // Field Catalog Editor item
    editor?: {
        selectedAtom: PrimitiveAtom<boolean>;
    }
};

//export type FceItems = FceItem[];
