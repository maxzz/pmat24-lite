import { atomEffect } from "jotai-effect";
import { useMemoOne } from "@/utils";
import { useAtomValue } from "jotai";

export type EffectFn = Parameters<typeof atomEffect>[0]; // (get: GetterWithPeek, set: SetterWithRecurse) => void | Cleanup;
export type GetterWithPeek = Parameters<EffectFn>[0];
export type SetterWithRecurse = Parameters<EffectFn>[1];

export function useAtomEffect(effectFn: EffectFn) {
    useAtomValue(
        useMemoOne(
            () => atomEffect(effectFn), [effectFn]
        )
    );
}
