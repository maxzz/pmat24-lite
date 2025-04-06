import { atom } from "jotai";
import { notImplYet } from "@/ui";
import { createGuid } from "@/store/manifest";
import { newManiContent } from "../../0-ctx-new-mani";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { rootDir } from "@/store";

export const doSaveNewManiAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        // notImplYet.onClick();
        const fileUs = get(newManiContent.fileUsAtom);
        if (!fileUs) {
            console.log('There is no fileUs for save');
            return false;
        }

        fileUs.fileCnt.fname = fileUs.fileCnt.fname || `${createGuid()}.${pmExtensionMani}`;

        if (fileUs.fileCnt.fromMain) {
            console.log('Not implemented yet');
        } else {
            const fileHandle = await rootDir.handle?.getFileHandle(fileUs.fileCnt.fname, { create: true });
            
            fileUs.fileCnt.webFsItem = new WebFsItem({
                parent: rootDir.handle,
                handle: fileHandle,
                legacyPath: rootDir.fpath,
            });

        }

        return false;
    }
);
