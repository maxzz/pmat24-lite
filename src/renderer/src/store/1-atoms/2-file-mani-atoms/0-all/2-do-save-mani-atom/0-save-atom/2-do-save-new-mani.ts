import { type Getter, type Setter, atom } from "jotai";
import { createGuid } from "@/store/manifest";
import { rootDir } from "@/store/1-atoms/1-files";
import { type FileUsAtom } from "@/store/store-types";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { doSaveOneAtom } from "./1-do-save-one";
import { newManiContent } from "@/store";
import { doClearSawHandleAtom } from "@/store/7-napi-atoms";
import { close_NewManiDlgAtom } from "@/store/1-atoms/7-dialogs";

export const doSaveNewManiTriggerAtom = atom(
    null,
    async (get, set): Promise<void> => {
        if (!rootDir.fpath) {
            console.error('There is no rootDir.fpath');
            return;
        }

        const saved = await asyncSaveNewMani(get, set);
        // const saved = await set(doSaveNewManiAtom);

        if (saved) {
            printAtomSaved(get(newManiContent.newFileUsAtomAtom));
            set(newManiContent.newFileUsAtomAtom, undefined); // preserve the new fileUsAtom from be disposed by newManiContent.init();

            set(close_NewManiDlgAtom);
            set(doClearSawHandleAtom); // Turn off fields highlight
        }
    }
);

async function asyncSaveNewMani(get: Getter, set: Setter): Promise<boolean> {
    //TODO: if we switch to embedded new manifest into tree, save will be done differently
    if (newManiContent.maniForCpassAtom) {
        return true; // For password change form we don't need to save as new manifest
    }

    const newFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
    const fileUs = newFileUsAtomAtom && get(newFileUsAtomAtom);
    if (!fileUs) {
        console.error('There is no fileUs for save');
        return false;
    }

    fileUs.fileCnt.fname = `${createGuid()}.${pmExtensionMani}`;
    fileUs.fileCnt.fpath = rootDir.fpath;

    fileUs.fileCnt.webFsItem = new WebFsItem({
        handle: undefined,
        parent: rootDir.handle,
        legacyPath: rootDir.fpath,
    });

    const saved = await set(doSaveOneAtom, newFileUsAtomAtom);
    return saved;
}

const doSaveNewManiAtom = atom(
    null,
    async (get, set): Promise<boolean> => {
        //TODO: if we switch to embedded new manifest into tree, save will be done differently
        if (newManiContent.maniForCpassAtom) {
            return true; // For password change form we don't need to save as new manifest
        }

        const newFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
        const fileUs = newFileUsAtomAtom && get(newFileUsAtomAtom);
        if (!fileUs) {
            console.error('There is no fileUs for save');
            return false;
        }

        fileUs.fileCnt.fname = `${createGuid()}.${pmExtensionMani}`;
        fileUs.fileCnt.fpath = rootDir.fpath;

        fileUs.fileCnt.webFsItem = new WebFsItem({
            handle: undefined,
            parent: rootDir.handle,
            legacyPath: rootDir.fpath,
        });

        const saved = await set(doSaveOneAtom, newFileUsAtomAtom);
        return saved;
    }
);

function printAtomSaved(fileUsAtom: FileUsAtom | undefined) {
    console.groupCollapsed(
        `%c🗿 Save: new fileUsAtom:%c${fileUsAtom?.toString()} %c`,
        'font-weight: normal; background-color: limegreen; color: darkgreen',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}

//04.12.25
//TODO: if we edit file name we should update sort order and filter but when user click save or reset button (i.e. not on every name update).
