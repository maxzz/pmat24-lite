import { proxy } from "valtio";
import { type FceItem, type FceItemValue } from "@/store/atoms";
import { FieldTyp, uuid, ValueAs, type ValueLife } from "pm-manifest";

export function createEmptyValueLife({ fType }: { fType: FieldTyp; }): ValueLife {
    return {
        fType,
        valueAs: ValueAs.askReuse,
        value: '',
        isRef: false,
        isNon: false,
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

export function createEmptyFceItemValue(fType: FieldTyp): FceItemValue {
    return {
        fType,
        displayname: '',
        dbname: '',
        ownernote: '',
        value: '',
        valueAs: ValueAs.askReuse,
        isRef: false,
        isNon: false,
    };
}

export function createEmptyFceItem(fType: FieldTyp): FceItem {
    const now = uuid.asRelativeNumber();
    const beforeEdit = createEmptyFceItemValue(fType);
    return {
        fieldValue: proxy({...beforeEdit}),
        beforeEdit: beforeEdit,
        fceMeta: {
            index: 0,
            uuid: now,
            mru: now,
        },
        editor: {
            selectedView: false,
            selectedDlg: false,
        },
    };
}
// TODO: provide name, index
