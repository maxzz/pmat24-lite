export const testScreen = { // Test screenshots collection
    A: 'A',
    B: 'B',
    none: 'none',
};

export const testMani = { // Test manifests content
    win32: 'win32',
    web: 'web',
    none: 'none',
};

export type TestScreenEnum = keyof typeof testScreen;   // Test screenshots collection
export type TestManiEnum = keyof typeof testMani;       // New manifest test content

//

export type TestCreate = {
    screen: TestScreenEnum;
    mani: TestManiEnum;
};

export const initialTestCreate: TestCreate = {
    screen: 'none',
    mani: 'none',
};
