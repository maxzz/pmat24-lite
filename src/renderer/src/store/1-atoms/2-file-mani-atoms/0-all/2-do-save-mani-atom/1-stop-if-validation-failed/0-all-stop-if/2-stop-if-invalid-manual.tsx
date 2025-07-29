import { type Getter, type Setter } from "jotai";
import { type ManiAtoms } from "../../../../9-types";
import { doVerifyManualFormAtom } from "../1-do-verify-atoms";
import { toast } from "sonner";
import { appSettings } from "@/store";

export function stopIfInvalidManual(maniAtoms: ManiAtoms, get: Getter, set: Setter): boolean | undefined {
    
    const errors = set(doVerifyManualFormAtom, { maniAtoms });
    
    if (errors) {
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

//TODO: validation: activate row
//TODO: validation: activate initial row
