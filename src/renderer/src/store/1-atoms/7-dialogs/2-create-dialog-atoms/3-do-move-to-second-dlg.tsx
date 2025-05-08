import { type Getter, type Setter, atom } from "jotai";
import { delay, doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { addToTotalManis, appSettings } from "../../9-ui-state";
import { R2MCalls } from "@/xternal-to-main";
import { createGuid } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { filesAtom, rootDir } from "../../1-files";
import { setManiActiveTab } from "../../3-right-panel";
import { doSelectFileUsTreeAtom } from "@/components/2-main/1-left/2-files-list";
import { doClearSawHandleAtom, sawHandleAtom, setBuildState } from "@/store/7-napi-atoms";
import { createFileUsFromNewXml, doSaveOneAtom, fileUsChanges, newManiContent, notificationNewSaved } from "@/store/1-atoms/2-file-mani-atoms";
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
        //await delay(100);
        set(setSizeNormal_SawMonitorAtom);
        //setTimeout(() => R2MCalls.showHideWindow(true), 100); //TODO: we need to call R2MCalls.setSawModeOnMain({ setOn: false }); and show in one single call

        // 2. Show dialog

        const { noNewManiDlg } = appSettings.appUi.uiAdvanced;
        const makingCpass = !!newManiContent.maniForCpassAtom;
        const inlineEditor = noNewManiDlg || makingCpass;

        const newFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
        const fileUs = newFileUsAtomAtom && get(newFileUsAtomAtom);
        if (!fileUs) {
            throw new Error('no.fileUs');
        }

        if (!inlineEditor) {
            const endedByOk = await asyncExecuteNewManiDlg(set);
            if (!endedByOk) {
                newManiContent.disposeActive(get, set);
                set(close_NewManiDlgAtom);
                return;
            }

            initFileUsFname({ fileUs, makingCpass: false });

            const saved = await set(doSaveOneAtom, newFileUsAtomAtom);
            if (!saved) {
                return;
            }
        } else {
            initFileUsFname({ fileUs, makingCpass });
            fileUsChanges.setNewLogin({ fileUs });
            setManiActiveTab(makingCpass ? 'cpass' : 'login');
        }

        addToFilesTree({ fileUsAtom: newFileUsAtomAtom, fileUs, makingCpass, get, set });

        set(newManiContent.newFileUsAtomAtom, undefined); // preserve the new fileUsAtom from be disposed by newManiContent.init();
        set(close_NewManiDlgAtom);
        set(doClearSawHandleAtom); // Turn off fields highlight //TODO: this should be done differently for inline editor

        printAtomSaved(newFileUsAtomAtom);
    }
);

//TODO: reset for new login should remove it from the tree - done
//TODO: reset button should be discard instead of reset - done
//TODO: manifest name before save should be updated with dialog
//TODO: highlight fields should be turned off but when?
//TODO: create cpass should be switch tab to cpass
//TODO: delete cpass should be switch tab to login or options

function initFileUsFname({ fileUs, makingCpass }: { fileUs: FileUs; makingCpass: boolean; }): void {
    if (makingCpass) {
        return;
    }

    fileUs.fileCnt.fname = `${createGuid()}.${pmExtensionMani}`;
    fileUs.fileCnt.fpath = rootDir.fpath;

    fileUs.fileCnt.webFsItem = new WebFsItem({
        handle: undefined,
        parent: rootDir.handle,
        legacyPath: rootDir.fpath,
    });
}

function addToFilesTree({ fileUsAtom, fileUs, makingCpass, get, set }: { fileUsAtom: FileUsAtom; fileUs: FileUs; makingCpass: boolean; get: Getter; set: Setter; }): void {
    if (makingCpass) {
        return;
    }

    set(filesAtom, [...get(filesAtom), fileUsAtom]);
    addToTotalManis(fileUs);

    set(doSelectFileUsTreeAtom, fileUsAtom);

    notificationNewSaved(fileUs);
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
