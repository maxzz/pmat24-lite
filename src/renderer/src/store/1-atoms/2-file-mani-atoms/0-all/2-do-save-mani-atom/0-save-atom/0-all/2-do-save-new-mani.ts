import { atom } from "jotai";
import { createGuid } from "@/store/manifest";
import { newManiContent } from "@/components/4-dialogs";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { rootDir } from "@/store/1-atoms/1-files";
import { doSaveOneAtom } from "./0-all-save-one";
import { type FileUsAtom } from "@/store/store-types";

export const doSaveNewManiAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        if (!rootDir.fpath) {
            console.error('There is no rootDir.fpath');
            return false;
        }

        const fileUs = get(newManiContent.fileUsAtom);
        if (!fileUs) {
            console.error('There is no fileUs for save');
            return false;
        }
        const fileUsAtom = newManiContent.fileUsAtom as FileUsAtom;

        fileUs.fileCnt.fname = `${createGuid()}.${pmExtensionMani}`;

        fileUs.fileCnt.webFsItem = new WebFsItem({
            handle: undefined,
            parent: rootDir.handle,
            legacyPath: rootDir.fpath,
        });

        const saved = await set(doSaveOneAtom, fileUsAtom);
        return saved;
    }
);
