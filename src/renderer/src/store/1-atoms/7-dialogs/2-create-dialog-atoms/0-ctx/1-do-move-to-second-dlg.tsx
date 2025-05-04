import { atom } from "jotai";
import { delay, doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { R2MCalls } from "@/xternal-to-main";
import { sawHandleAtom, setBuildState } from "@/store/7-napi-atoms";
import { createFileUsFromNewXml } from "@/store/1-atoms/2-file-mani-atoms";
import { close_SawMonitorAtom } from "../1-open-saw-monitor";
import { open_NewManiDlgAtom } from "../2-open-new-mani-dlg";
import { checkboxCreateManualModeAtom, showProgressAtom } from "./0-all-atoms";
import { startMonitorTimerAtom, stopMonitorTimerAtom } from "./7-do-monitoring";
import { setSawMonitorSizeNormalAtom } from "./8-saw-monitor-size";

export const doMoveToSecondDlgAtom = atom(
    null,
    async (get, set, { cancel }: { cancel: boolean; }): Promise<void> => {
        if (cancel) {
            R2MCalls.showHideWindow(false); //TODO: do we need to hide and show? we don't use it below.

            set(close_SawMonitorAtom);
            set(setSawMonitorSizeNormalAtom);
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

        const created = await createFileUsFromNewXml({ params: { hwnd, manual: get(checkboxCreateManualModeAtom), }, showProgressAtom, get, set, });
        if (!created) {
            set(startMonitorTimerAtom);
            return;
        }

        // Continue on the second dialog

        //R2MCalls.showHideWindow(false);

        set(close_SawMonitorAtom);
        await delay(100);
        set(setSawMonitorSizeNormalAtom);
        set(open_NewManiDlgAtom);

        //setTimeout(() => R2MCalls.showHideWindow(true), 100); //TODO: we need to call R2MCalls.setSawModeOnMain({ setOn: false }); and show in one single call
    }
);

//TODO: show detection progress feedback
//TODO: abort detection request if the user click dialog close button
