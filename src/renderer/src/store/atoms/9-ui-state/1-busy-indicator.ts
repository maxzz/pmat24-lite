import { proxy } from "valtio";
import { atom } from "jotai";

export const busyIndicator = proxy({
    msg: '',
});

// Busy indicator

export const busyAtom = atom('');