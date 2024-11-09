import { atom } from "jotai";
import { atomWithCallback, type OnValueChangeParams, type OnValueChange } from "@/util-hooks";
import { type FceItem, type Fce0DlgIn, type FceCtx, type FceDlgIn, type Fce0Ctx, type FceAtoms, type FcePropAtoms } from "../9-types";
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

export type OnChangeValueWithUpdateName<T> = (updateName: T) => OnValueChange<T>;

export function createFcePropAtoms(onValueChange: OnChangeValueWithUpdateName<string>): FcePropAtoms {

    function onScopedChange(name: string) {
        function cb({ get, set, nextValue }: OnValueChangeParams<any>) { // It can be string | ValueLife
            onValueChange(name)({ get, set, nextValue });
        }
        return cb;
    };

    const rv: FcePropAtoms = {
        nameAtom: atomWithCallback<string>('', onScopedChange('nameAtom')),
        typeAtom: atomWithCallback<string>('', onScopedChange('typeAtom')),
        valueAtom: atomWithCallback<string>('', onScopedChange('valueAtom')),
        ownernoteAtom: atomWithCallback<string>('', onScopedChange('ownernoteAtom')),

        useItAtom: atom(true),
        valueLifeAtom: atomWithCallback<ValueLife>({ valueAs: ValueAs.askReuse, value: '', }, onScopedChange('valueLifeAtom')),
    };
    return rv;
}

export function createFceCtx({ fceAtoms, inData, closeFldCatDialog }: { fceAtoms: FceAtoms, inData: FceDlgIn, closeFldCatDialog: (outData: any) => void; }): FceCtx {
    const showSelectBtn = inData.outBoxAtom;

    const onChange = (name: string) => () => {
        console.log('onChange', name);
    };

    const rv: FceCtx = {
        inData,
        fceAtoms,
        selectedItemAtom: atom<FceItem | null>(null),
        fcePropAtoms: createFcePropAtoms(onChange),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ fldCatItem: item }) : undefined,
    };
    return rv;
}
