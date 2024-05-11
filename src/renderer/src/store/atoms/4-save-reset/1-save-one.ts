import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";
import { ManiAtoms } from "../3-file-mani-atoms/9-types";
import { rightPanelAtom } from "../2-right-panel";
import { packManifestData } from "../3-file-mani-atoms/0-all/10-pack-manifest-data";

export const doSaveOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        packManifestData(fileUs, fileUsAtom, get, set, newFilename);

        fileUs.changesSet.clear();
    }
);

export const doSaveOneIfNotNullAtom = atom(null,
    (get, set) => {
        const fileUsAtom = get(rightPanelAtom);

        if (!fileUsAtom) {
            return;
        }

        set(doSaveOneAtom, fileUsAtom);
    }
);

//TODO: submit editor
//TODO: policy editor as part of fields editor
