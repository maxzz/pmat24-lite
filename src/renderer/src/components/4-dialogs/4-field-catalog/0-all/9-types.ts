import { type PrimitiveAtom } from "jotai";
import { type FldCatInData, type FceItem } from "@/store";

export type FceCtx = {
    inData: FldCatInData;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;
}
