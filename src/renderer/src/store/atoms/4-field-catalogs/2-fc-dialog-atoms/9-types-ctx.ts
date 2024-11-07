import { type PrimitiveAtom } from "jotai";
import { type FldCatInData, type FceItem } from "@/store";
import { type ValueLife } from "@/store/manifest";

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
