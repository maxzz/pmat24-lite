// 5-row-input-w-atom-ai-ideas.tsx

import { useEffect, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";

function validateError(value: string) {
    return value === '111' ? '' : `Value ${value} is invalid, should be 111`;
}

function useDebouncedValue<Value>(value: Value, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function useDebounceAtom(valueAtom: PrimitiveAtom<string>, delay: number) {
    const [value, setValue] = useAtom(valueAtom);
    const debouncedValue = useDebouncedValue(value, delay);

    return [debouncedValue, setValue] as const;
}

function useDebounceAtomWithValidation(valueAtom: PrimitiveAtom<string>, delay: number) {
    const [value, setValue] = useDebounceAtom(valueAtom, delay);
    const [error, setError] = useState('');

    useEffect(() => {
        const errorMsg = validateError(value);
        setError(errorMsg);
    }, [value]);

    return [value, setValue, setError, error] as const;
}

function useDebounceAtomWithValidationAndTouched(valueAtom: PrimitiveAtom<string>, delay: number) {
    const [value, setValue, setError, error] = useDebounceAtomWithValidation(valueAtom, delay);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (touched) {
            const errorMsg = validateError(value);
            setError(errorMsg);
        }
    }, [value, touched]);

    return [value, setValue, error, touched] as const;
}

function useDebounceAtomWithValidationAndTouchedAndOpenTooltip(valueAtom: PrimitiveAtom<string>, delay: number) {
    const [value, setValue, error, touched] = useDebounceAtomWithValidationAndTouched(valueAtom, delay);
    const [openTooltip, setOpenTooltip] = useState(false);

    return [value, setValue, error, touched, openTooltip] as const;
}

function useDebounceAtomWithValidationAndTouchedAndOpenTooltipAndSetOpenTooltip(valueAtom: PrimitiveAtom<string>, delay: number) {
    const [value, setValue, error, touched, openTooltip] = useDebounceAtomWithValidationAndTouchedAndOpenTooltip(valueAtom, delay);
    const setOpenTooltip = useState(false)[1];

    return [value, setValue, error, touched, openTooltip, setOpenTooltip] as const;
}

function useDebounceAtomWithValidationAndTouchedAndOpenTooltipAndSetOpenTooltipAndTooltip(valueAtom: PrimitiveAtom<string>, delay: number) {
    const [value, setValue, error, touched, openTooltip, setOpenTooltip] = useDebounceAtomWithValidationAndTouchedAndOpenTooltipAndSetOpenTooltip(valueAtom, delay);

    return [value, setValue, error, touched, openTooltip, setOpenTooltip] as const;
}
