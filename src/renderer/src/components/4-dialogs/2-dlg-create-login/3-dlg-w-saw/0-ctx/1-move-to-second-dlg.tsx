import { atom } from "jotai";
import { doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { doMonitoringTimerAtom, doOpenCreateManiSawAtom, doOpenSawOverlayAtom, napiBuildState, sawHandleAtom, setBuildState } from "@/store";
import { doTurnOffSawModeOnClientAtom } from "./8-saw-mode-on-client";
import { createFileUsFromNewXml } from "../../0-ctx-new-mani";
import { createManualManiAtom, showProgressAtom } from "./0-all-atoms";

export const doMoveToSecondDlgAtom = atom(
    null,
    async (get, set, { cancel }: { cancel: boolean; }): Promise<void> => {
        if (cancel) {
            set(doOpenSawOverlayAtom, false);
            set(doTurnOffSawModeOnClientAtom);
            setBuildState({ error: '' });
            return;
        }
        console.log('doMoveToSecondDlgAtom', napiBuildState);

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            set(doAddNextToastIdAtom, toast.info('No application', { position: "top-center" }));
            return;
        }

        // Before close and open the second dialog:

        //TODO: manual mode

        set(doMonitoringTimerAtom, { doStart: false });

        const created = await createFileUsFromNewXml({ params: { hwnd, manual: get(createManualManiAtom), passwordChange: false }, showProgressAtom: showProgressAtom, get, set, });
        if (!created) {
            set(doMonitoringTimerAtom, { doStart: true });
            return;
        }

        // set(doMonitoringTimerAtom, { doStart: true });
        // return;

        // Continue on the second dialog

        set(doOpenSawOverlayAtom, false);
        set(doTurnOffSawModeOnClientAtom);
        set(doOpenCreateManiSawAtom, true);
    }
);

//TODO: show detection progress feedback
//TODO: stop timer before detecting the app conent by clicking continue button - done
//TODO: abort detection request if the user click dialog close button
