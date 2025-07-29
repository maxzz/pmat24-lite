import { type Getter, type Setter } from "jotai";
import { type VerifyError, type ManiAtoms } from "../../../9-types";
import { doVerifyNormalFormAtom } from "./8-do-verify-atom/4-do-verify-normal-atom";
import { toast } from "sonner";
import { appSettings } from "@/store";

export function stopIfInvalidNormal(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {

    const errors: VerifyError[] = set(doVerifyNormalFormAtom, { maniAtoms }) || [];

    const [login, cpass] = maniAtoms;

    if (!login) {
        errors.push({ error: 'Login form is missing', tab: 'options' });
    }

    if (errors.length) {
        appSettings.right.mani.activeTab = errors[0].tab;
        
        const messages = errors.map(
            (err, idx) => {
                return <div key={idx}>{err.error}</div>;
            }
        );

        toast.error(<div className="flex flex-col">{messages}</div>);
        return true;
    }

}
