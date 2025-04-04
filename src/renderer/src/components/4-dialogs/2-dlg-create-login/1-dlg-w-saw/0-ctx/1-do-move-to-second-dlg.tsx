import { atom } from "jotai";
import { delay, doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { R2MCalls } from "@/xternal-to-main";
import { doMonitoringTimerAtom, doOpenDlgNewManiSawAtom, doOpenSawOverlayAtom, sawHandleAtom, setBuildState } from "@/store";
import { createFileUsFromNewXml } from "../../0-ctx-new-mani";
import { createManualManiAtom, showProgressAtom } from "./0-all-atoms";
import { doTurnOffSawModeOnClientAtom } from "./8-saw-mode-on-client";

export const doMoveToSecondDlgAtom = atom(
    null,
    async (get, set, { cancel }: { cancel: boolean; }): Promise<void> => {
        if (cancel) {
            R2MCalls.showHideWindow(false); //TODO: do we need to hide and show? we don't use it below.

            set(doOpenSawOverlayAtom, false);
            set(doTurnOffSawModeOnClientAtom);
            setBuildState({ error: '' });

            setTimeout(() => R2MCalls.showHideWindow(true), 500);
            return;
        }

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            set(doAddNextToastIdAtom, toast.info('No application', { position: "top-center" }));
            return;
        }

        set(doMonitoringTimerAtom, { doStart: false });

        const created = await createFileUsFromNewXml({ params: { hwnd, manual: get(createManualManiAtom), }, showProgressAtom, get, set, });

        if (!created) {
            set(doMonitoringTimerAtom, { doStart: true });
            return;
        }

        // Continue on the second dialog

        //R2MCalls.showHideWindow(false);

        set(doOpenSawOverlayAtom, false);
        await delay(100);
        set(doTurnOffSawModeOnClientAtom);
        set(doOpenDlgNewManiSawAtom, true);

        //setTimeout(() => R2MCalls.showHideWindow(true), 100); //TODO: we need to call R2MCalls.setSawModeOnMain({ setOn: false }); and show in one single call
    }
);

//TODO: show detection progress feedback
//TODO: abort detection request if the user click dialog close button
