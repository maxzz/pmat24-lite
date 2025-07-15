import { useEffect } from "react";
import { type Getter, type Setter, type SetStateAction, PrimitiveAtom, atom, useSetAtom } from "jotai"; //https://jotai.org/docs/recipes/atom-with-listeners //GH: "atomWithListeners path:*.ts"

export type AtomWithListeners<Value> = ReturnType<typeof atomWithListeners<Value>>;
export type ListenerCallback<Value> = (get: Getter, set: Setter, newVal: Value, prevVal: Value) => void;

export type AtomAndUseListener<Value> = PrimitiveAtom<Value> & { useListener: (callback: ListenerCallback<Value>) => void; };

export function atomWithListeners<Value>(initialValue: Value): readonly [AtomAndUseListener<Value>, (callback: ListenerCallback<Value>) => void] {

    const baseAtom = atom(initialValue);
    const listenersAtom = atom<ListenerCallback<Value>[]>([]);

    const anAtom: PrimitiveAtom<Value> = atom(
        (get) => get(baseAtom),
        (get, set, arg: SetStateAction<Value>) => {
            const prevVal = get(baseAtom);

            set(baseAtom, arg);

            const newVal = get(baseAtom);

            get(listenersAtom).forEach(
                (callback) => {
                    callback(get, set, newVal, prevVal);
                }
            );
        }
    );

    const useListener = (callback: ListenerCallback<Value>): void => { // This is stable callback, it"s created once when atom is created
        const setListeners = useSetAtom(listenersAtom);
        useEffect(
            () => {
                setListeners((prev) => [...prev, callback]);

                return () => {
                    setListeners(
                        (prev) => {
                            const idx = prev.indexOf(callback);
                            return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
                        }
                    );
                };
            }, [setListeners, callback]
        );
    };

    (anAtom as AtomAndUseListener<Value>).useListener = useListener;

    return [(anAtom as AtomAndUseListener<Value>), useListener] as const;
}

export function atomAndUseListener<Value>(initialValue: Value): AtomAndUseListener<Value> {
    return atomWithListeners(initialValue)[0];
}
