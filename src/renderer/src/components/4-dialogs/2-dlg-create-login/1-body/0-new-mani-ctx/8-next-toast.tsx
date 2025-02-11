import { atom } from "jotai";
import { toast } from "sonner";

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
        ids.forEach(
            (id) => id && toast.dismiss(id)
        );
        set(_nextToastIdAtom, []);
    }
);
