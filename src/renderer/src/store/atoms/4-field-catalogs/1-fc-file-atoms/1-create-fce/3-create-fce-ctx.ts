import { Atom, atom } from "jotai";
import { atomWithCallback, type OnValueChangeParams } from "@/util-hooks";
import { type FceItem, type FceCtx, type FceDlgIn, type FceAtoms, type FcePropAtoms, type OnChangeFcePropParams, type FceFilterOptions } from "../../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { createEmptyValueLife, FieldTyp, type ValueLife } from "@/store/manifest";
import { doFcePropChangesAtom } from "./6-prop-changes-atom";
import { createEmptyFceFilterOptions, createHasSelectedScopedAtom, filterFceItems } from "../2-items";
import { create } from "domain";
import { createMruScopedAtom } from "../../3-fc-mru";

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

    const filterAtom = atom(createEmptyFceFilterOptions());
    const shownAtom = createShownAtom(filterAtom, fceAtoms.allAtom);

    const rv0: Omit<FceCtx, 'hasSelectedItemAtom' | 'txtAtom' | 'pswAtom'> = {
        inData,
        fceAtoms,
        isDlgCtx: !!inData,
        isMaster: false,
        selectedIdxStoreAtom: atom(-1),
        selectedItemAtom: atom<FceItem | undefined>(undefined),
        scrollTo: 0,
        focusGridAtom: atom(false),

        filterAtom,
        showAtom: shownAtom,

        fcePropAtoms: createFcePropAtoms(onValueChange),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ fldCatItem: item }) : undefined,
        onChangeFcePropValue,
    };

    const rv: FceCtx = rv0 as FceCtx;
    rv.hasSelectedItemAtom = createHasSelectedScopedAtom(rv);
    rv.txtAtom = createMruScopedAtom(rv, true);
    rv.pswAtom = createMruScopedAtom(rv, false);

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
        valueLifeAtom: atomWithCallback<ValueLife>(createEmptyValueLife({ fType: FieldTyp.edit }), onScopedChange<ValueLife>('valueLifeAtom')),
    };
    return rv;
}

function createShownAtom(filterAtom: Atom<FceFilterOptions>, allAtom: Atom<FceItem[]>): Atom<FceItem[]> {
    return atom<FceItem[]>(
        (get) => {
            const filterOptions = get(filterAtom);
            return filterFceItems(get(allAtom), filterOptions);
        }
    );
}
