import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../../9-types";
import { doVerifyOptionsAtom } from "./8-do-verify-atom/6-do-verify-options-atom";
import { toast } from "sonner";
import { appSettings } from "@/store";

export function stopIfInvalidOptions(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    const errors = set(doVerifyOptionsAtom, { maniAtoms });
    if (errors) {
        appSettings.right.mani.activeTab = 'options';

        const messages = errors.map(
            (err, idx) => {
                return <div key={idx}>{err.error}</div>;
            }
        );

        toast.error(<div className="flex flex-col">{messages}</div>);
        return true;
    }
}

//TODO: validation: activate row (balloon)
