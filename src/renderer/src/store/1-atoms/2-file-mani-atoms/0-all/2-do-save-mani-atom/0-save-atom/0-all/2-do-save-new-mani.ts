import { atom } from "jotai";
import { createGuid } from "@/store/manifest";
import { rootDir } from "@/store/1-atoms/1-files";
import { type FileUsAtom } from "@/store/store-types";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { doSaveOneAtom } from "./0-all-save-one";
import { newManiContent } from "@/components/4-dialogs";
import { doClearSawHandleAtom } from "@/store/7-napi-atoms";
import { doOpenDlgNewManiSawAtom } from "@/store/1-atoms/7-dialogs";

export const doSaveNewManiTriggerAtom = atom(
    null,
    async (get, set) => {
        const saved = await set(doSaveNewManiAtom);
        if (saved) {
            set(doOpenDlgNewManiSawAtom, false);
            set(doClearSawHandleAtom); // Turn off fields highlight
        }
    }
);

const doSaveNewManiAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        if (!rootDir.fpath) {
            console.error('There is no rootDir.fpath');
            return false;
        }

        //TODO: if we switch to embedded new manifest into tree, save will be done differently
        if (newManiContent.maniForCpassAtom) {
            return true; // For password change form we don't need to save as new manifest
        }

        const fileUs = newManiContent.newFileUsAtom && get(newManiContent.newFileUsAtom);
        if (!fileUs) {
            console.error('There is no fileUs for save');
            return false;
        }
        const fileUsAtom = newManiContent.newFileUsAtom as FileUsAtom;

        fileUs.fileCnt.fname = `${createGuid()}.${pmExtensionMani}`;
        fileUs.fileCnt.fpath = rootDir.fpath;

        fileUs.fileCnt.webFsItem = new WebFsItem({
            handle: undefined,
            parent: rootDir.handle,
            legacyPath: rootDir.fpath,
        });

        const saved = await set(doSaveOneAtom, fileUsAtom);
        if (saved) {
            newManiContent.newFileUsAtom = undefined; // preserve the new fileUsAtom from be disposed by newManiContent.init();
        }
        return saved;
    }
);
