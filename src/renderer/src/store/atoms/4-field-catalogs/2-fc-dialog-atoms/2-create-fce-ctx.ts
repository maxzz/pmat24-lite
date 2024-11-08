import { atom } from "jotai";
import { type FceItem, type Fce0InData } from "../9-types";
import { type Fce0Ctx } from "../9-types";
import { ValueAs, type ValueLife } from "@/store/manifest";

export function createFceCtx(inData: Fce0InData, closeFldCatDialog: (outData: any) => void): Fce0Ctx {
    const showSelectBtn = inData.outBoxAtom;
    const rv: Fce0Ctx = {
        inData,
        selectedItemAtom: atom<FceItem | null>(null),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ fldCatItem: item }) : undefined,

        nameAtom: atom(''),
        typeAtom: atom(''),
        valueAtom: atom(''),
        ownernoteAtom: atom(''),

        useItAtom: atom(true),
        valueLifeAtom: atom<ValueLife>({
            valueAs: ValueAs.askReuse,
            value: '',
        }),
    };
    return rv;
}
