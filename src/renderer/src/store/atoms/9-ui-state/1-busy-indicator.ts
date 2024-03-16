// import { atom } from "jotai";

import { proxy } from "valtio";

// Busy indicator

// export const busyAtom = atom('');

export const busyIndicator = proxy({
    msg: '',
});
