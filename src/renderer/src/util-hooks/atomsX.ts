import { atom, Getter, PrimitiveAtom, SetStateAction, Setter, WritableAtom } from 'jotai';
// version: 04.03.24

export type OnValueChange<Value> = ({ get, set, nextValue }: { get: Getter; set: Setter; nextValue: Value; }) => void;

export function atomWithCallback<Value>(initialValue: Value, onValueChange: OnValueChange<Value>): WritableAtom<Value, [update: SetStateAction<Value>], void> {
    const baseAtom = atom(initialValue);
    const derivedAtom = atom(
        (get) => get(baseAtom),
        (get, set, update: SetStateAction<Value>) => {
            const nextValue = typeof update === 'function'
                ? (update as (prev: Value) => Value)(get(baseAtom))
                : update;
            set(baseAtom, nextValue);
            onValueChange({ get, set, nextValue });
        }
    );
    return derivedAtom;
}

// Data loading

export function atomLoader(loader: (get: Getter, set: Setter) => void) {
    const onceAtom = atom<boolean>(false); // to get around <React.StrictMode> during development.
    const baseAtom = atom(null, (get, set) => { !get(onceAtom) && (loader(get, set), set(onceAtom, true)); });
    baseAtom.onMount = (run) => run();
    return baseAtom;
}

export type Atomize<T> = {
    [key in keyof T & string as `${key}Atom`]: PrimitiveAtom<T[key]>;
};

export type LoadingDataState<T> = {
    loading: boolean;
    error: unknown | null;
    data: T | null;
};

export const loadingDataStateInit = () => ({ loading: true, error: null, data: null });

// Atoms family

type AtomsFamilyResult<T> = {
    (key: string): PrimitiveAtom<T>;
    setValues: (values: Record<string, T>) => Map<string, PrimitiveAtom<T>>;
    getValues: (get: Getter) => Record<string, T>;
};

/**
 * AtomsFamily with inner items access
 * 
 * @param initialValues - Object with initial values from Storage
 * @param atomInitialValue - Default value for newly created items
 * @param initAtom - function to create new atom
 * @returns {AtomsFamilyResult<T>} function to access family items
 * 
 * Usage:
 * 
 *  store.ts:
 * 
 *  export const openAtoms = AtomsFamily<boolean>(
 *     Storage.initialData.open, 
 *     false,
 *     (param: boolean) => atomWithCallback(param, Storage.save)
 *  );
 *
 *  client.ts:
 * 
 *      const [open, setOpen] = useAtom(openAtoms(section.name)); ... onClick={() => setOpen((v) => !v)}
 */
export function atomsFamily<T>(initialValues: Record<string, T>, atomInitialValue: T, initAtom: (param: T) => PrimitiveAtom<T>): AtomsFamilyResult<T> {
    const map = valuesToAtoms(initialValues);

    const getAtom = (key: string) => {
        let value = map.get(key);
        if (!value) {
            value = initAtom(atomInitialValue);
            map.set(key, value);
        }
        return value;
    };

    getAtom.setValues = valuesToAtoms;
    getAtom.getValues = atomsToValues;
    return getAtom;

    function valuesToAtoms(values: Record<string, T>) {
        return new Map((Object.entries(values || {}).map(([key, value]) => [key, initAtom(value)])));
    }

    function atomsToValues(get: Getter): Record<string, T> {
        return Object.fromEntries([...map.entries()].map(([key, atom]) => [key, get(atom)]));
    }
}
