import { FieldTyp, type ValueLife, ValueAs } from "pm-manifest";

export function createEmptyValueLife({ fType }: { fType: FieldTyp; }): ValueLife {
    return {
        fType,
        value: '',
        valueAs: ValueAs.askReuse,
        isRef: false,
        isNon: false,
    };
}

export function sameValueLife(from: ValueLife, to: ValueLife): boolean {
    const rv = (
        from.value === to.value &&
        from.valueAs === to.valueAs &&
        from.isRef === to.isRef &&
        from.fType === to.fType &&
        from.isNon === to.isNon
    );
    return rv;
}

/**
 * Mostly for debugging
 */
export function valueAs2Str(valueAs: ValueAs) {
    return valueAs === ValueAs.askReuse ? 'ask' : valueAs === ValueAs.askConfirm ? 'confirm' : 'always';
}
