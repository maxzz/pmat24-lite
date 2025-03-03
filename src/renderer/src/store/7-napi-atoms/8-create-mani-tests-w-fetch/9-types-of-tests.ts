export const testHwnd = { // Test hwnd and icon
    win32: 'win32',
    web: 'web',
    none: 'none',
};

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

export type TestHwndEnum = keyof typeof testHwnd;
export type TestScreenEnum = keyof typeof testScreen;
export type TestManiEnum = keyof typeof testMani;

// Local storage data

export type TestCreate = {
    hwnd: TestHwndEnum;     // Test hwnd and icon
    screen: TestScreenEnum; // Test screenshots collection
    mani: TestManiEnum;     // New manifest test content
    dummyCaption: boolean;  // Test multiple windows caption. Test 2 line vs. 1 line caption
};

export const initialTestCreate: TestCreate = {
    hwnd: 'none',
    screen: 'none',
    mani: 'none',
    dummyCaption: false,
};
