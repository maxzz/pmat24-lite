import { useEffect, useRef, useState } from 'react'; //https://github.com/pmndrs/react-spring/blob/main/packages/shared/src/hooks/useMemoOne.ts

/**
 * @param getResult - getResult changes on every call
 * @param inputs - the inputs array changes on every call
 * @returns cached result
 * //TODO: remove once merged (https://github.com/alexreardon/use-memo-one/pull/10)
 */
export function useMemoOne<T>(getResult: () => T, inputs?: any[]): T {
    const [initial] = useState(
        (): Cache<T> => ({
            inputs,
            result: getResult(),
        })
    );

    const committed = useRef<Cache<T> | undefined>(undefined);
    const prevCache = committed.current;

    let cache = prevCache;
    if (cache) {
        const useCache = Boolean(
            inputs && cache.inputs && areInputsEqual(inputs, cache.inputs)
        );
        if (!useCache) {
            cache = {
                inputs,
                result: getResult(),
            };
        }
    } else {
        cache = initial;
    }

    useEffect(() => {
        committed.current = cache;
        if (prevCache == initial) {
            initial.inputs = initial.result = undefined;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cache]);

    return cache.result!;
}

type Cache<T> = {
    inputs?: any[];
    result?: T;
};

/**
 * @param callback - getResult changes on every call
 * @param inputs - the inputs array changes on every call
 * @returns cached result
 */
export function useCallbackOne<T extends Function>(callback: T, inputs?: any[]): T {
    return useMemoOne(() => callback, inputs);
}

export function areInputsEqual(next: any[], prev: any[]) {
    if (next.length !== prev.length) {
        return false;
    }
    for (let i = 0; i < next.length; i++) {
        if (next[i] !== prev[i]) {
            return false;
        }
    }
    return true;
}
