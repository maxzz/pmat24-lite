import { atom } from "jotai";
import { type FceItem, type Fce0DlgIn, type FceCtx, type FceDlgIn, type Fce0Ctx, type FceAtoms } from "../9-types";
import { ValueAs, type ValueLife } from "@/store/manifest";

export function createFce0Ctx(inData: Fce0DlgIn, closeFldCatDialog: (outData: any) => void): Fce0Ctx {
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

// v1

export function createFceCtx({ fceAtoms, inData, closeFldCatDialog }: { fceAtoms: FceAtoms, inData: FceDlgIn, closeFldCatDialog: (outData: any) => void; }): FceCtx {
    const showSelectBtn = inData.outBoxAtom;
    const rv: FceCtx = {
        inData,
        fceAtoms,
        selectedItemAtom: atom<FceItem | null>(null),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ fldCatItem: item }) : undefined,
    };
    return rv;
}
