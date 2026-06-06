import { atom } from "jotai";
import { R2MCalls } from "@/xternal-to-main";
import { setBuildState } from "@/store/7-napi-atoms";
import { sawMonitor_doSawCloseAtom } from "./7-0-open-anim-saw-monitor";

export const doOnButtonCancelAtom = atom(
    null,
    (get, set) => {
        R2MCalls.showHideWindow(false); //TODO: do we need to hide and show? we don't use it below.
        set(sawMonitor_doSawCloseAtom);
        setBuildState({ error: '' });
        //setTimeout(() => R2MCalls.showHideWindow(true), 500); // This timeout causing undesired delay when closing the dialog with ESC key. see SawMonitorDlgBody()
        R2MCalls.showHideWindow(true);
    }
);
