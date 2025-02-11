import { type LegacyRef, type MutableRefObject, type RefCallback } from "react";

export function mergeRefs<T = any>(refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined | null>): RefCallback<T> {
    return (value) => {
        refs.forEach(
            (ref) => {
                if (typeof ref === "function") {
                    ref(value);
                } else if (!!ref) {
                    (ref as MutableRefObject<T | null>).current = value;
                }
            }
        );
    };
}
