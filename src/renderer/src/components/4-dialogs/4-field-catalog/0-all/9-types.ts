import { type PrimitiveAtom } from "jotai";
import { type FldCatInData, type FceItem } from "@/store";

export type FceCtx = { // Field Catalog Editor context
    inData: FldCatInData;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;
}
