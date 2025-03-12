import { atom } from "jotai";
import { doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { doMonitoringTimerAtom, doOpenCreateManiSawAtom, doOpenSawOverlayAtom, napiBuildState, sawHandleAtom, setBuildState } from "@/store";
import { doTurnOffSawModeOnClientAtom } from "./8-saw-mode-on-client";
import { getXmlCreateFileUs } from "../../0-ctx-new-mani";
import { showProgressAtom } from "./0-all-atoms";

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
            set(doAddNextToastIdAtom, toast.info('No application for training', { position: "top-center" }));
            return;
        }

        // Before close and open the second dialog:

        //TODO: manual mode

        set(doMonitoringTimerAtom, { doStart: false });

        const move = await getXmlCreateFileUs({ hwnd, showProgressAtom, get, set });
        if (!move) {
            if (napiBuildState.buildError) {
                toast.error(napiBuildState.buildError);
                setBuildState({ error: '' });
            }
            set(doMonitoringTimerAtom, { doStart: true });
            return;
        }

        return;
        // Continue on the second dialog

        set(doOpenSawOverlayAtom, false);
        set(doTurnOffSawModeOnClientAtom);
        set(doOpenCreateManiSawAtom, true);
    }
);

//TODO: show detection progress feedback
//TODO: stop timer before detecting the app conent by clicking continue button - done
//TODO: abort detection request if the user click dialog close button
