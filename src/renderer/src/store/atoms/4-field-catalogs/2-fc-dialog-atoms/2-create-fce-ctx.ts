import { atom } from "jotai";
import { type FceItem, type FldCatInData } from "../9-types";
import { type FceCtx } from "../9-types";
import { ValueAs, type ValueLife } from "@/store/manifest";

export function createFceCtx(inData: FldCatInData, closeFldCatDialog: (outData: any) => void): FceCtx {
    const showSelectBtn = inData.outBoxAtom;
    const rv: FceCtx = {
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
