import { atom, Getter, Setter } from "jotai";
import { delay, doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { appSettings } from "../../9-ui-state";
import { R2MCalls } from "@/xternal-to-main";
import { doDisposeFileUsAtomAtom } from "@/store/store-utils";
import { doClearSawHandleAtom, sawHandleAtom, setBuildState } from "@/store/7-napi-atoms";
import { createFileUsFromNewXml, doSaveOneAtom, newManiContent } from "@/store/1-atoms/2-file-mani-atoms";
import { close_SawMonitorAtom } from "./1-open-saw-monitor";
import { close_NewManiDlgAtom, open_NewManiDlgAtom } from "./2-open-new-mani-dlg";
import { checkboxCreateManualModeAtom, showProgressAtom } from "./0-ctx/0-all-atoms";
import { startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx/7-do-monitoring";
import { setSizeNormal_SawMonitorAtom } from "./0-ctx/8-saw-monitor-size";
import { FileUs, FileUsAtom } from "@/store/store-types";
import { createGuid } from "pm-manifest";
import { pmExtensionMani, WebFsItem } from "@shared/ipc-types";
import { rootDir } from "../../1-files";

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
            set(doAddNextToastIdAtom, toast.info('No application', { position: "top-center" }));
            return;
        }

        set(stopMonitorTimerAtom);

        if (!rootDir.fpath) {
            console.error('no.rootDir.fpath');
            return;
        }

        const created = await createFileUsFromNewXml({ params: { hwnd, manual: get(checkboxCreateManualModeAtom), }, showProgressAtom, get, set, });
        if (!created) {
            set(startMonitorTimerAtom);
            return;
        }

        // Continue on the second dialog

        //R2MCalls.showHideWindow(false);

        set(close_SawMonitorAtom);
        await delay(100);
        set(setSizeNormal_SawMonitorAtom);

        const resolve = new Promise<boolean>((resolve) => { set(open_NewManiDlgAtom, { resolve, }); });
        const ok = await resolve;


        const { noNewManiDlg } = appSettings.appUi.uiAdvanced;

        const currentFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
        set(newManiContent.newFileUsAtomAtom, undefined);
        currentFileUsAtomAtom && set(doDisposeFileUsAtomAtom, currentFileUsAtomAtom); // The previuos operation will clean up the fileUsAtom if it was saved otherwise it will be undefined.


        if (!ok) {
            return;
        }

        set(doSaveNewManiTriggerAtom);
        // const doSaveNewManiTrigger = useSetAtom(doSaveNewManiTriggerAtom);
        {/* <Button variant="default" size="xs" onClick={doSaveNewManiTrigger}> */}

        //set(open_NewManiDlgAtom);

        //setTimeout(() => R2MCalls.showHideWindow(true), 100); //TODO: we need to call R2MCalls.setSawModeOnMain({ setOn: false }); and show in one single call
    }
);

export const doSaveNewManiTriggerAtom = atom(
    null,
    async (get, set): Promise<void> => {

        const newFileUsAtomAtom = get(newManiContent.newFileUsAtomAtom);
        const fileUs = newFileUsAtomAtom && get(newFileUsAtomAtom);
        if (!fileUs) {
            console.error('no.fileUs');
            return;
        }

        const saved = await asyncSaveNewMani(newFileUsAtomAtom, fileUs, get, set);

        if (saved) {
            printAtomSaved(newFileUsAtomAtom);

            set(newManiContent.newFileUsAtomAtom, undefined); // preserve the new fileUsAtom from be disposed by newManiContent.init();

            set(close_NewManiDlgAtom);
            set(doClearSawHandleAtom); // Turn off fields highlight
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
