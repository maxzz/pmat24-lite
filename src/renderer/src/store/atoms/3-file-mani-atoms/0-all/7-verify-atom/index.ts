import { atom } from "jotai";
import { ManiAtoms } from "../../9-types";

export const verifyErrorAtom = atom('');

export const verifyOptionsAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }) => {
        
        const [login, cpass] = maniAtoms;
        if (!login && !cpass) {
            return;
        }

        if (login) {
            const loginOptions = login.optionsAtoms;
            if (loginOptions) {
                const error = '';
                set(verifyErrorAtom, error);
            }
        }

        set(verifyErrorAtom, '');

    }
);
