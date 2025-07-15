import { useEffect, useRef, useState } from "react"; //https://github.com/pmndrs/react-spring/blob/main/packages/shared/src/hooks/useMemoOne.ts

/**
 * @param getResult - getResult changes on every call
 * @param deps - the inputs array changes on every call
 * @returns cached result
 * //TODO: remove once merged (https://github.com/alexreardon/use-memo-one/pull/10)
 */
export function useMemoOne<T>(getResult: () => T, deps?: any[]): T {
    const initial: Cache<T> = useState(() => ({ result: getResult(), deps, }))[0];
    const committed = useRef<Cache<T> | undefined>(undefined);
    const prevCache = committed.current;

    let cache = prevCache;
    if (cache) {
        const useCache = Boolean(deps && cache.deps && areInputsEqual(deps, cache.deps));
        if (!useCache) {
            //console.log(`useMemoOne.cache miss: deps:%o cache.deps:%o`, deps, cache.deps);
            cache = { result: getResult(), deps, };
        }
    } else {
        cache = initial;
    }

    useEffect(
        () => {
            committed.current = cache;
            if (prevCache == initial) {
                initial.deps = initial.result = undefined;
            }
        }, [cache]
    );

    return cache.result!;
}

type Cache<T> = {
    result?: T;
    deps?: any[];
};

/**
 * @param callback - getResult changes on every call
 * @param deps - the inputs array changes on every call
 * @returns cached result
 */
export function useCallbackOne<T extends Function>(callback: T, deps?: any[]): T {
    return useMemoOne(() => callback, deps);
}

//

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
