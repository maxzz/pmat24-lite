import { atom } from "jotai";
import { proxy } from "valtio";
import { type FceItemEditor, type FceItem, type FceItemValue, type FceItemMeta } from "@/store/1-atoms";
import { createGuid, type FieldTyp, startTime, uuid } from "pm-manifest";
import { createEmptyValueLife } from "./2-value-life";

export function createEmptyFceItemValue(fType: FieldTyp): FceItemValue {
    return {
        displayname: '',
        dbname: createGuid(),
        ownernote: '',
        ...createEmptyValueLife({ fType }),
    };
}

/**
 * Name and index should be set by caller.
 */
export function createEmptyFceItem(fType: FieldTyp): FceItem {
    const beforeEdit = createEmptyFceItemValue(fType);
    return {
        fieldValue: proxy({ ...beforeEdit }),
        beforeEdit: beforeEdit,
        fceMeta: createFceItemMeta(0),
        editor: proxy<FceItemEditor>({ isSelectedInView: false, isSelectedInPicker: false, }),
    };
}

export function createFceItemMeta(index: number): FceItemMeta {
    const mru = uuid.asNumber();
    const now = mru - startTime
    return {
        index,
        uuid: now,
        mruAtom: atom(mru),
    };
}

// Think of the following. generated by supermaven
/*
export function createEmptyField(): Meta.Field {
    return {
        mani: createEmptyMani(),
        ftyp: FieldTyp.edit,
        life: createEmptyValueLife(),
        path: {},
        pidx: 0,
        ridx: 0,
        uuid: uuid.asRelativeNumber(),
    };
}

export function createEmptyMani(): Mani.Field {
    return {
        type: FieldTyp.edit,
        password: false,
        choosevalue: '',
        policy: {
            policy: Policy.ask,
            policy2: Policy2.ask,
            options: '',
        },
    };
}

export function createEmptyMeta(): Meta.Field {
    return {
        mani: createEmptyMani(),
        ftyp: FieldTyp.edit,
        life: createEmptyValueLife(),
        path: {},
        pidx: 0,
        ridx: 0,
        uuid: uuid.asRelativeNumber(),
    };
}
*/
