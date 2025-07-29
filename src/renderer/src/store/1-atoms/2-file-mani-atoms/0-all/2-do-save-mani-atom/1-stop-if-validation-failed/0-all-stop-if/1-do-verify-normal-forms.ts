import { type Getter, type Setter } from "jotai";
import { type ManiAtoms, type VerifyError } from "../../../../9-types";

export function doVerifyNormalFormsAtom(get: Getter, set: Setter, { maniAtoms }: { maniAtoms: ManiAtoms; }): VerifyError[] | undefined {
    const rv: VerifyError[] = [];
    const [login, cpass] = maniAtoms;

    if (login?.normal) {

        let totalUseIt = 0;
        login.normal.rowCtxs.forEach(
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
        cpass.normal.rowCtxs.forEach(
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

//TODO: We can remove the button elements if the form is intended for websites. Buttons were added for old IE submit method.
