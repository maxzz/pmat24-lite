//https://github.com/alexreardon/use-memo-one last: React 18; no updates

// @flow
import { useRef, useState, useEffect } from 'react';
import areInputsEqual from './are-inputs-equal';

type Cache<T> = {|
  inputs: ?(mixed[]),
  result: T,
|};

export function useMemoOne<T>(
  // getResult changes on every call,
  getResult: () => T,
  // the inputs array changes on every call
  inputs?: mixed[],
): T {
  // using useState to generate initial value as it is lazy
  const initial: Cache<T> = useState(() => ({
    inputs,
    result: getResult(),
  }))[0];
  const isFirstRun = useRef<boolean>(true);
  const committed = useRef<Cache<T>>(initial);

  // persist any uncommitted changes after they have been committed
  const useCache: boolean =
    isFirstRun.current ||
    Boolean(
      inputs &&
        committed.current.inputs &&
        areInputsEqual(inputs, committed.current.inputs),
    );

  // create a new cache if required
  const cache: Cache<T> = useCache
    ? committed.current
    : {
        inputs,
        result: getResult(),
      };

  // commit the cache
  useEffect(() => {
    isFirstRun.current = false;
    committed.current = cache;
  }, [cache]);

  return cache.result;
}

export function useCallbackOne<T: Function>(
  // getResult changes on every call,
  callback: T,
  // the inputs array changes on every call
  inputs?: mixed[],
): T {
  return useMemoOne(() => callback, inputs);
}

// Aliased exports
// A drop in replacement for useMemo and useCallback that plays
// very well with eslint-plugin-react-hooks

export const useMemo = useMemoOne;
export const useCallback = useCallbackOne;






// @flow

export default function areInputsEqual(
  newInputs: mixed[],
  lastInputs: mixed[],
) {
  // no checks needed if the inputs length has changed
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  // Using for loop for speed. It generally performs better than array.every
  // https://github.com/alexreardon/memoize-one/pull/59

  for (let i = 0; i < newInputs.length; i++) {
    // using shallow equality check
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  return true;
}
