type Prettify<T> = {
    [K in keyof T]: T[K];
} & {}; // https://www.youtube.com/watch?v=2lCCKiWGlC0

// Utility types

type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};

type WriteableDeep<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>
};
