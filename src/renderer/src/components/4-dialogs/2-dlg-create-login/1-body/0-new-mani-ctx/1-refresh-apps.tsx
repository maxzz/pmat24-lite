import { atom } from "jotai";
import { newManiCtx } from "./0-ctx";
import { type TlwScreenshotInfo, allScreenshotAtom, defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";

export function create_DoRefreshAppsAtom() {
    return atom(
        null,
        async (get, set) => {
            const ctx = newManiCtx;

            // 1. Get current selected item
            const currentIdx = get(ctx.appSelectedIdxAtom);
            let currentItem: TlwScreenshotInfo | undefined = currentIdx === -1 ? undefined : get(allScreenshotAtom)[currentIdx];
            set(ctx.appSelectedIdxAtom, -1);

            // 2. Refresh screenshots
            await set(doSetScreenshotsAtom, { width: defaultScreenshotWidth });

            // 3. clear previously detected content
            set(newManiCtx.maniXmlAtom, undefined);
            set(newManiCtx.fileUsAtom, undefined);

            // 4. Find previously selected item in the new list
            if (currentItem) {
                const allScreenshots = get(allScreenshotAtom);
                const newIdx = allScreenshots.findIndex(item => item.item.hwnd === currentItem.item.hwnd);
                set(ctx.appSelectedIdxAtom, newIdx);
            }
        }
    );
}

export type DoRefreshAppsAtom = ReturnType<typeof create_DoRefreshAppsAtom>;
