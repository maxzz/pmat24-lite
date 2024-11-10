import { atom } from "jotai";
import { atomWithCallback, type OnValueChangeParams } from "@/util-hooks";
import { type FceItem, type FceCtx, type FceDlgIn, type FceAtoms, type FcePropAtoms } from "../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { ValueAs, type ValueLife } from "@/store/manifest";

//export type OnChangeValueWithUpdateName<T> = (updateName: string) => OnValueChange<T>;

export function createFcePropAtoms(onValueChange: OnChangeValueWithUpdateName<string | ValueLife>): FcePropAtoms {

    function onScopedChange<T extends string | ValueLife>(name: string) {
        function cb({ get, set, nextValue }: OnValueChangeParams<T>) { // It can be string | ValueLife
            onValueChange(name)({ get, set, nextValue });
        }
        return cb;
    };

    const rv: FcePropAtoms = {
        nameAtom: atomWithCallback<string>('', onScopedChange<string>('nameAtom')),
        typeAtom: atomWithCallback<string>('', onScopedChange<string>('typeAtom')),
        valueAtom: atomWithCallback<string>('', onScopedChange<string>('valueAtom')),
        ownernoteAtom: atomWithCallback<string>('', onScopedChange<string>('ownernoteAtom')),

        useItAtom: atom(true),
        valueLifeAtom: atomWithCallback<ValueLife>({ valueAs: ValueAs.askReuse, value: '' }, onScopedChange<ValueLife>('valueLifeAtom')),
    };
    return rv;
}

export function createFceCtx({ fceAtoms, inData, closeFldCatDialog }: { fceAtoms: FceAtoms, inData: FceDlgIn | undefined, closeFldCatDialog: (outData: any) => void; }): FceCtx {
    const showSelectBtn = inData?.outBoxAtom;

    const onValueChange = (name: string) => {
        return ({ get, set, nextValue }) => {
            console.log('onChange', fceAtoms, name, nextValue);
        }
    };

    const rv: FceCtx = {
        inData,
        fceAtoms,
        selectedItemAtom: atom<FceItem | null>(null),
        fcePropAtoms: createFcePropAtoms(onValueChange),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ fldCatItem: item }) : undefined,
    };
    return rv;
}
