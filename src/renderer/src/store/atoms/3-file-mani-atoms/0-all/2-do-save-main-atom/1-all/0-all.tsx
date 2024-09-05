import { atom, Getter, Setter } from "jotai";
import { FileUsAtom } from "@/store/store-types";
import { packManifestData } from "../0-conv/1-pack-manifest-data";
import { doVerifyOptionsAtom } from "../../7-do-verify-atom";
import { toast } from "sonner";
import { appSettings } from "@/store/app-settings";
import { ManiAtoms } from "../../../9-types";

function stopIfOptionErrors(get: Getter, set: Setter, maniAtoms: ManiAtoms): boolean | undefined {
    const errors = set(doVerifyOptionsAtom, { maniAtoms });
    if (errors) {
        appSettings.right.mani.activeTab = 'options';

        const messages = errors.map(
            (err, idx) => {
                return <div key={idx}>{err.msg}</div>;
            }
        );

        toast.error(<div className="flex flex-col">{messages}</div>);
        return true;
    }
}

export const doSaveOneAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        if (stopIfOptionErrors(get, set, maniAtoms)) {
            return;
        }

        packManifestData(get, set, fileUs, fileUsAtom, newFilename);

        console.log('saved', fileUs.fname);

        // fileUs.changesSet.clear();

        //TODO: validate
        //TODO: check if we can save from web or electron
        //TODO: collect all data from all atoms
        //TODO: each file may have no filename
        // const loginFormAtoms = maniAtoms[0];
        // const cpassFormAtoms = maniAtoms[1];
        // if (loginFormAtoms) {
        //     loginFormAtoms.fieldsAtoms;
        //     loginFormAtoms.submitAtoms;
        //     loginFormAtoms.policyAtoms;
        //     loginFormAtoms.optionsAtoms;
        // }

    }
);

//TODO: submit editor
//TODO: policy editor as part of fields editor - done
//TODO: add validation
