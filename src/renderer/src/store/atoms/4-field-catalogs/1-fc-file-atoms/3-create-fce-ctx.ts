import { atom } from "jotai";
import { atomWithCallback, type OnValueChangeParams } from "@/util-hooks";
import { type FceItem, type FceCtx, type FceDlgIn, type FceAtoms, type FcePropAtoms, type OnChangeFcePropValue } from "../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { ValueAs, type ValueLife } from "@/store/manifest";
import { doFcePropChangesAtom } from "./4-prop-changes-atom";
import { a } from "@react-spring/web";

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

type CreateFceCtxProps = {
    fceAtoms: FceAtoms;
    inData: FceDlgIn | undefined;
    closeFldCatDialog: (outData: any) => void;
};

export function createFceCtx({ fceAtoms, inData, closeFldCatDialog }: CreateFceCtxProps): FceCtx {
    const showSelectBtn = inData?.outBoxAtom;

    const onChangeFcePropValue: OnChangeFcePropValue = ({ fceCtx, name, nextValue, set }) => {
        set(doFcePropChangesAtom, { fceCtx, name, nextValue });
    };

    const onValueChange = (name: string) => {
        return ({ get, set, nextValue }) => {
            onChangeFcePropValue({ fceCtx: rv, name, get, set, nextValue }); //TBD: discard back link rv?
        };
    };

    const rv: FceCtx = {
        inData,
        fceAtoms,
        isDlgCtx: !!inData,
        selectedIdxStoreAtom: atom(-1),
        selectedItemAtom: atom<FceItem | undefined>(undefined),
        fcePropAtoms: createFcePropAtoms(onValueChange),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ fldCatItem: item }) : undefined,
        onChangeFcePropValue,
    };
    return rv;
}
