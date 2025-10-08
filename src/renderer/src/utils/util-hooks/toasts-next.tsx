import { useEffect } from "react";
import { atom, useSetAtom } from "jotai";
import { toaster } from "@/ui/local-ui";

const _nextToastIdAtom = atom<Array<string | number | undefined>>([]);

export const doAddNextToastIdAtom = atom(
    null,
    (get, set, id: string | number | undefined) => {
        const ids = get(_nextToastIdAtom);
        set(_nextToastIdAtom, [...ids, id]);
    }
);

export const doDissmissNextToastsAtom = atom(
    null,
    (get, set) => {
        const ids = get(_nextToastIdAtom);
        ids.forEach(toastId => toastId && toaster.dismiss(toastId));
        set(_nextToastIdAtom, []);
    }
);

export function useDissmissNextToasts() {
    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    useEffect(() => doDissmissNextToasts, []);
}
