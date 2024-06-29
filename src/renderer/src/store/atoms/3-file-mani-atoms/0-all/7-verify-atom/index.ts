import { atom } from "jotai";
import { ManiAtoms } from "../../9-types";
import { OptionsConv } from "../../4-options";

export const verifyOptionsErrorAtom = atom('');

export const verifyOptionsAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }) => {
        
        const [login, cpass] = maniAtoms;
        if (!login && !cpass) {
            return;
        }

        if (login) {
            const errors = OptionsConv.verifyAtoms(login.optionsAtoms, get, set);
            if (errors.length) {
                const error = errors[0];
                set(verifyOptionsErrorAtom, error);
            }
        }

        if (cpass) {
            const errors = OptionsConv.verifyAtoms(cpass.optionsAtoms, get, set);
            if (errors.length) {
                const error = errors[0];
                set(verifyOptionsErrorAtom, error);
            }
        }

        set(verifyOptionsErrorAtom, '');
    }
);
