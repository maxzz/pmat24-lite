import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";
import { packManifestData } from "./1-pack-manifest-data";

export const doSaveOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom, newFilename?: string) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        packManifestData(get, set, fileUs, fileUsAtom, newFilename);
    }
);

//TODO: submit editor
//TODO: policy editor as part of fields editor - done
//TODO: add validation