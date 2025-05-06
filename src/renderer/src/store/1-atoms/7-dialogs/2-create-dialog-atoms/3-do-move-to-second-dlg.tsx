import { type Getter, type Setter, atom } from "jotai";
import { delay, doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { addToTotalManis, appSettings } from "../../9-ui-state";
import { R2MCalls } from "@/xternal-to-main";
import { createGuid } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { filesAtom, rootDir } from "../../1-files";
import { doSelectFileUsTreeAtom } from "@/components/2-main/1-left/2-files-list";
import { doClearSawHandleAtom, sawHandleAtom, setBuildState } from "@/store/7-napi-atoms";
import { createFileUsFromNewXml, doSaveOneAtom, newManiContent, notificationNewSaved } from "@/store/1-atoms/2-file-mani-atoms";
import { close_SawMonitorAtom } from "./1-open-saw-monitor";
import { asyncExecuteNewManiDlg, close_NewManiDlgAtom } from "./2-open-new-mani-dlg";
import { checkboxCreateManualModeAtom, showProgressAtom } from "./0-ctx/0-all-atoms";
import { startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx/7-do-monitoring";
import { setSizeNormal_SawMonitorAtom } from "./0-ctx/8-saw-monitor-size";

export const doMoveToSecondDlgAtom = atom(
    null,
    async (get, set, { cancel }: { cancel: boolean; }): Promise<void> => {
        if (cancel) {
            R2MCalls.showHideWindow(false); //TODO: do we need to hide and show? we don't use it below.
            set(close_SawMonitorAtom);
            set(setSizeNormal_SawMonitorAtom);
            setBuildState({ error: '' });
            setTimeout(() => R2MCalls.showHideWindow(true), 500);
            return;
        }

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            set(doAddNextToastIdAtom, toast.info('No application selected', { position: "top-center" }));
            return;
        }

        // 1.1. Check if can create new valid manifest

        set(stopMonitorTimerAtom);

        const created = await createFileUsFromNewXml({ params: { hwnd, manual: get(checkboxCreateManualModeAtom), }, showProgressAtom, get, set, });
        if (!created) {
            set(startMonitorTimerAtom);
            return;
        }

        // 1.2. Close Saw monitor dialog

        //R2MCalls.showHideWindow(false);
        set(close_SawMonitorAtom);
        await delay(100);
        set(setSizeNormal_SawMonitorAtom);
        //setTimeout(() => R2MCalls.showHideWindow(true), 100); //TODO: we need to call R2MCalls.setSawModeOnMain({ setOn: false }); and show in one single call

        // 2. Show dialog

        const { noNewManiDlg } = appSettings.appUi.uiAdvanced;

        const inlineEditor = noNewManiDlg || !!newManiContent.maniForCpassAtom;

        if (!inlineEditor) {
            const endedByOk = await asyncExecuteNewManiDlg(set); // cpass dialog is embedded, so don't open dialog
            if (!endedByOk) {
                newManiContent.disposeActive(get, set);
                set(close_NewManiDlgAtom);
                return;
            }

            // 3. Save after dialog

            const newFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
            const fileUs = newFileUsAtomAtom && get(newFileUsAtomAtom);
            if (!fileUs) {
                throw new Error('no.fileUs');
            }

            const saved = await asyncSaveNewMani(newFileUsAtomAtom, fileUs, get, set);
            if (!saved) {
                return;
            }

            printAtomSaved(newFileUsAtomAtom);

            set(newManiContent.newFileUsAtomAtom, undefined); // preserve the new fileUsAtom from be disposed by newManiContent.init();

            set(close_NewManiDlgAtom);
            set(doClearSawHandleAtom); // Turn off fields highlight
        } else {

        }
    }
);

async function asyncSaveNewMani(fileUsAtom: FileUsAtom, fileUs: FileUs, get: Getter, set: Setter): Promise<boolean> {
    //TODO: if we switch to embedded new manifest into tree, save will be done differently
    if (newManiContent.maniForCpassAtom) {
        return true; // For password change form we don't need to save as new manifest
    }

    fileUs.fileCnt.fname = `${createGuid()}.${pmExtensionMani}`;
    fileUs.fileCnt.fpath = rootDir.fpath;

    fileUs.fileCnt.webFsItem = new WebFsItem({
        handle: undefined,
        parent: rootDir.handle,
        legacyPath: rootDir.fpath,
    });

    const saved = await set(doSaveOneAtom, fileUsAtom);
    if (!saved) {
        return false;
    }

    if (fileUs.fileCnt.newFile) {
        set(filesAtom, [...get(filesAtom), fileUsAtom]);
        addToTotalManis(fileUs);

        set(doSelectFileUsTreeAtom, fileUsAtom);

        fileUs.fileCnt.newFile = false;
        notificationNewSaved(fileUs);
    }

    return saved;
}

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

//TODO: show detection progress feedback
//TODO: abort detection request if the user click dialog close button
