import { useEffect } from 'react';
import { type Getter, type Setter, type SetStateAction, atom, useSetAtom } from 'jotai'; //https://jotai.org/docs/recipes/atom-with-listeners //GH: 'atomWithListeners path:*.ts'

export function atomWithListeners<Value>(initialValue: Value) {

    const baseAtom = atom(initialValue);
    const listenersAtom = atom<ListenerCallback<Value>[]>([]);

    const anAtom = atom(
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

    const useListener = (callback: ListenerCallback<Value>) => {
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

    return [anAtom, useListener] as const;
}

type ListenerCallback<Value> = (get: Getter, set: Setter, newVal: Value, prevVal: Value) => void;
