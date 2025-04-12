type Prettify<T> = {
    [K in keyof T]: T[K];
} & {}; // https://www.youtube.com/watch?v=2lCCKiWGlC0

// Utility types

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
