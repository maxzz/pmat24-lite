import { type Atom, atom } from "jotai";
import { atomWithCallback, type OnValueChangeParams } from "@/util-hooks";
import { createEmptyValueLife, FieldTyp, type ValueLife } from "@/store/manifest";
import { type FceItem, type FceCtx, type FceDlgIn, type FceAtoms, type FcePropAtoms, type OnChangeFcePropParams, type FceFilterOptions, type FceDlgOut } from "../../9-types";
import { type OnChangeValueWithUpdateName } from "@/ui";
import { doFcePropChangesAtom } from "./6-prop-changes-atom";
import { createEmptyFceFilterOptions, createHasSelectedScopedAtom, filterFceItems } from "../2-items";
import { printFceItems } from "../../3-fc-mru";

type CreateFceCtxProps = {
    fceAtoms: FceAtoms;
    inData: FceDlgIn | undefined;
    closeFldCatDialog: (outData: FceDlgOut) => void;
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

    const filterAtom = atom(createEmptyFceFilterOptions({
        search: '',
        showText: !!inData?.showTxt,
        showPassword: !!inData?.showPsw,
        ascending: undefined,
    }));
    const shownAtom = createShownScopedAtom(fceAtoms.allAtom, filterAtom);

    const rv0: Omit<FceCtx, 'hasSelectedItemAtom'> = {
        inData,
        fceAtoms,
        isPicker: !!inData?.openItemPickerDlg,
        isMaster: false,
        selectedIdxStoreAtom: atom(-1),
        selectedItemAtom: atom<FceItem | undefined>(undefined),
        scrollTo: 0,
        focusGridAtom: atom(false),

        filterAtom,
        showAtom: shownAtom,

        fcePropAtoms: createFcePropAtoms(onValueChange),
        onItemDoubleClick: showSelectBtn ? (item: FceItem) => closeFldCatDialog({ selectedItem: item }) : undefined,
        onChangeFcePropValue,
    };

    const rv: FceCtx = rv0 as FceCtx;
    rv.hasSelectedItemAtom = createHasSelectedScopedAtom(rv);

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

function createShownScopedAtom(allAtom: Atom<FceItem[]>, filterAtom: Atom<FceFilterOptions>): Atom<FceItem[]> {
    return atom<FceItem[]>(
        (get) => {
            const filterOptions = get(filterAtom);
            const rv = filterFceItems(get(allAtom), filterOptions);
            // console.log(`filterFceItems rv:`, printFceItems('filter', rv));
            return rv
        }
    );
}
