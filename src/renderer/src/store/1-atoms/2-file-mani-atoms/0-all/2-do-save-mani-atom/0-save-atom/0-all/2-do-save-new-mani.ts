import { atom } from "jotai";
import { notImplYet } from "@/ui";
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

        if (fileUs.fileCnt.fromMain) {
            // notImplYet.onClick();
            // console.error('Not implemented yet');
        } else {
            // const fileHandle = await rootDir.handle?.getFileHandle(fileUs.fileCnt.fname, { create: true });

            fileUs.fileCnt.webFsItem = new WebFsItem({
                parent: rootDir.handle,
                handle: undefined, //fileHandle,
                legacyPath: rootDir.fpath,
            });

            const saved = await set(doSaveOneAtom, fileUsAtom);
            return saved;
        }

        return false;
    }
);
