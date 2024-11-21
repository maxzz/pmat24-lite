import { atom } from "jotai";
import { atomWithCallback, type OnValueChangeParams } from "@/util-hooks";
import { type FceItem, type FceCtx, type FceDlgIn, type FceAtoms, type FcePropAtoms, type OnChangeFcePropParams } from "../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { FieldTyp, ValueAs, type ValueLife } from "@/store/manifest";
import { doFcePropChangesAtom } from "./6-prop-changes-atom";

type CreateFceCtxProps = {
    fceAtoms: FceAtoms;
    inData: FceDlgIn | undefined;
    closeFldCatDialog: (outData: any) => void;
};

export function createFceCtx({ fceAtoms, inData, closeFldCatDialog }: CreateFceCtxProps): FceCtx {
    const showSelectBtn = inData?.outBoxAtom;

    function onChangeFcePropValue({ fceCtx, name, nextValue, set }: OnChangeFcePropParams) {
        set(doFcePropChangesAtom, { fceCtx, name, nextValue });
    }

    function onValueChange(name: string) {
        return ({ get, set, nextValue }) => {
            onChangeFcePropValue({ fceCtx: rv, name, get, set, nextValue }); //TBD: discard back link rv?
        };
    }

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

function createFcePropAtoms(onValueChange: OnChangeValueWithUpdateName<string | ValueLife>): FcePropAtoms {

    function onScopedChange<T extends string | ValueLife>(name: string) {
        function cb({ get, set, nextValue }: OnValueChangeParams<T>) { // It can be string | ValueLife
            onValueChange(name)({ get, set, nextValue });
        }
        return cb;
    }

    const rv: FcePropAtoms = {
        nameAtom: atomWithCallback<string>('', onScopedChange<string>('nameAtom')),
        valueAtom: atomWithCallback<string>('', onScopedChange<string>('valueAtom')),
        ownernoteAtom: atomWithCallback<string>('', onScopedChange<string>('ownernoteAtom')),

        useItAtom: atom(true),
        valueLifeAtom: atomWithCallback<ValueLife>({ fType: FieldTyp.edit, valueAs: ValueAs.askReuse, value: '', isRef: false, isNon: false }, onScopedChange<ValueLife>('valueLifeAtom')),
    };
    return rv;
}
