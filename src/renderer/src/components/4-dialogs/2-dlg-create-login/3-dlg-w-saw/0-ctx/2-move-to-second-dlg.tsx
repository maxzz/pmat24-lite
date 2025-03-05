import { atom } from "jotai";
import { doAddNextToastIdAtom } from "@/utils";
import { toast } from "sonner";
import { doMonitoringAtom, doOpenCreateManiSawAtom, doOpenSawOverlayAtom, sawHandleAtom } from "@/store";
import { doTurnOffSawModeOnClientAtom } from "./1-saw-mode-on-client";
import { getXmlCreateFileUs } from "../../0-ctx-new-mani";

export const showProgressAtom = atom(false);

export const doMoveToSecondDlgAtom = atom(
    null,
    async (get, set, { cancel }: { cancel: boolean; }) => {
        if (cancel) {
            set(doOpenSawOverlayAtom, false);
            set(doTurnOffSawModeOnClientAtom);
            return;
        }

        const hwnd = get(sawHandleAtom)?.hwnd;
        if (!hwnd) {
            set(doAddNextToastIdAtom, toast.info('No application selected.'));
            return;
        }

        // Before close and open the second dialog:

        //TODO: manual mode

        set(doMonitoringAtom, { doStart: false });

        const move = await getXmlCreateFileUs({ hwnd, showProgressAtom, get, set });
        if (!move) {
            set(doMonitoringAtom, { doStart: true });
            return;
        }

        // Continue on the second dialog

        set(doOpenSawOverlayAtom, false);
        set(doTurnOffSawModeOnClientAtom);
        set(doOpenCreateManiSawAtom, true);
    }
);

//TODO: stop timer before detecting the app conent by clicking continue button
//TODO: show detection progress feedback
