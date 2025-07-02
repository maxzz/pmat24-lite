/**
 * Remove optional flags from at least one property of T
 */
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    & Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys];
