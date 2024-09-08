import { atom } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../9-types";

export const doVerifyNormalFormAtom = atom(null,
    (get, set, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined => {

        const rv: VerifyError[] = [];

        const [login, cpass] = maniAtoms;

        if (login?.normal) {
            let totalUseIt = 0;
            login.normal.fieldsAtoms.forEach(
                (fieldAtoms, idx) => {
                    const useIt = get(fieldAtoms.useItAtom);
                    if (useIt) {
                        totalUseIt++;
                    }
                }
            );

            if (!totalUseIt) {
                rv.push({ error: 'No login fields selected', tab: 'login' });
            }
        }

        if (cpass?.normal) {
            let totalUseIt = 0;
            cpass.normal.fieldsAtoms.forEach(
                (fieldAtoms, idx) => {
                    const useIt = get(fieldAtoms.useItAtom);
                    if (useIt) {
                        totalUseIt++;
                    }
                }
            );

            if (!totalUseIt) {
                rv.push({ error: 'No password change fields selected', tab: 'cpass' });
            }
        }

        return rv.length ? rv : undefined;
    }
);
