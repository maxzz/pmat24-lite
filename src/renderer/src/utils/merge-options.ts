export function mergeDefaultAndLoaded<T extends Record<string, unknown>>({ defaults, loaded }: { defaults: T; loaded: any | undefined | null; }): T {
    if (!loaded) {
        return defaults;
    }
    const entries = Object.entries(defaults);
    const res = entries.map(([key, defaultValue]) => [key, loaded[key] !== undefined ? loaded[key] : defaultValue]);
    return Object.fromEntries(res);
}
