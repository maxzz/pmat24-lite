import { FieldTyp, LIST_references, LIST_valueAskNames, ReferenceItem, ValueAs, ValueLife } from "@/store/manifest";

function pickRefsList(isPsw: boolean): Record<string, ReferenceItem> { //TODO: move out value <-> index mappers
    return LIST_references[isPsw ? 'psw' : 'txt'];
}

function idx2RefName(v: number, isPsw: boolean) {
    return Object.keys(pickRefsList(isPsw))[v];
}

type getValueUiStateReturn = {
    dropdownAllItems: string[];
    dropdownSelectedIndex: number;
    context: Context;
    inputText: string;
    showAsRef: boolean;
    disabled: boolean | undefined;
    title: string | undefined;
};

export function getValueUiState(valueLife: ValueLife, choosevalue: string | undefined): getValueUiStateReturn {
    const isBtn = valueLife.fType === FieldTyp.button;
    const isPsw = valueLife.fType === FieldTyp.psw;

    const listAskNames = isBtn ? [] : [...LIST_valueAskNames];
    listAskNames.length && listAskNames.push('-');

    const listValues = choosevalue?.split(':') || [];
    listValues.length && listValues.push('-');

    const listRefs = isPsw || valueLife.fType === FieldTyp.edit ? Object.values(pickRefsList(isPsw)).map((item) => item.f) : [];

    const idxToStartValues = listAskNames.length;
    const idxToStartRefs = idxToStartValues + listValues.length;

    const dropdownAllItems = [...listAskNames, ...listValues, ...listRefs];
    const dropdownIdxs = [...listAskNames.map(() => 0), ...listValues.map(() => idxToStartValues), ...listRefs.map(() => idxToStartRefs)];

    dropdownAllItems.at(-1) === '-' && dropdownAllItems.pop();

    const inputText = getInpuText(valueLife, isBtn, isPsw);
    const dropdownSelectedIndex = getDropdownSelectedIndex(valueLife, idxToStartRefs, idxToStartValues, listValues, isPsw);

    const showAsRef = valueLife.isRef || !valueLife.value;
    const disabled = isBtn ? true : undefined; //readOnly={valueLife.fType === FieldTyp.list ? true : undefined} // OK but it is too match, admin should have it
    const title = disabled ? 'Buttons have no state value' : valueLife.isRef && refName2Full(valueLife.value, isPsw) || undefined;

    return {
        dropdownAllItems,
        dropdownSelectedIndex,

        context: {
            dropdownIdxs,
            idxToStartRefs,
            idxToStartValues,
            listValues,
            isPsw,
        },

        inputText,
        showAsRef,
        disabled,
        title,
    };

    function refName2Idx(value: string | undefined, isPsw: boolean) {
        return value ? pickRefsList(isPsw)[value].i : -1;
    }

    function refName2Txt(value: string | undefined, isPsw: boolean) {
        return value ? pickRefsList(isPsw)[value].s : '';
    }

    function refName2Full(value: string | undefined, isPsw: boolean) {
        return value ? pickRefsList(isPsw)[value].f : ''; //TODO: we can use placeholder on top of input (ingone all events on it) and do multiple lines
    }

    function valueAs2Idx(valueAs: ValueAs) {
        return valueAs === ValueAs.askReuse ? 0 : valueAs === ValueAs.askConfirm ? 1 : valueAs === ValueAs.askAlways ? 2 : 0;
    }

    function getInpuText(valueLife: ValueLife, isBtn: boolean, isPsw: boolean) {
        const inputText =
            valueLife.isRef
                ? refName2Txt(valueLife.value, isPsw)
                : valueLife.value
                    ? valueLife.value
                    : valueLife.isNon
                        ? ''
                        : isBtn
                            ? ''
                            : LIST_valueAskNames[valueLife.valueAs];
        return inputText;
    }
    
    function getDropdownSelectedIndex(valueLife: ValueLife, idxToStartRefs: number, idxToStartValues: number, listValues: string[], isPsw: boolean) {
        const dropdownSelectedIndex =
            valueLife.isRef
                ? idxToStartRefs + refName2Idx(valueLife.value, isPsw)
                : valueLife.value
                    ? listValues.length
                        ? idxToStartValues + listValues.indexOf(valueLife.value)
                        : -1
                    : valueAs2Idx(valueLife.valueAs);
        return dropdownSelectedIndex;
    }
}

type Context = {
    dropdownIdxs: number[];
    idxToStartRefs: number;
    idxToStartValues: number;
    listValues: string[];
    isPsw: boolean;
};

export function mapIndexToValueLife(idx: number, v: ValueLife, context: Context): ValueLife {
    const { dropdownIdxs, idxToStartRefs: idxToRefs, idxToStartValues: idxToValues, listValues, isPsw, } = context;
    const groupIdx = dropdownIdxs[idx];
    if (groupIdx === idxToRefs) {
        // refs group
        return { ...v, value: idx2RefName(idx - idxToRefs, isPsw), isRef: true, valueAs: ValueAs.askReuse, isNon: false, };
    } else if (groupIdx === idxToValues) {
        // values group
        return { ...v, value: listValues[idx - idxToValues], isRef: false, valueAs: ValueAs.askReuse, isNon: false, };
    } else {
        // ask group
        return { ...v, value: '', isRef: false, valueAs: idx, isNon: false, };
    }
}
