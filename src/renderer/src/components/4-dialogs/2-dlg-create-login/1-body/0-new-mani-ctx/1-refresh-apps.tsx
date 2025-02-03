import { atom } from "jotai";
import { newManiCtx, type NewManiCtx } from "./0-ctx";
import { wizardFirstPage } from "./8-step-items-data";
import { type TlwScreenshotInfo, allScreenshotAtom, doSetScreenshotsAtom  } from "@/store/7-napi-atoms";

export function create_DoRefreshAppsAtom() {
    return atom(
        null,
        (get, set) => {
            const ctx = newManiCtx;
            const currentIdx = get(ctx.appSelectedIdxAtom);

            let currentItem: TlwScreenshotInfo | undefined = currentIdx === -1 ? undefined : get(allScreenshotAtom)[currentIdx];
            set(ctx.appSelectedIdxAtom, -1);

        }
    );
}

export type DoRefreshAppsAtom = ReturnType<typeof create_DoRefreshAppsAtom>;
