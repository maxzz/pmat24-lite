import { atom } from "jotai";
import { allScreenshotAtom, defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";
import { doInitNewManiContentAtom } from "@/store/1-atoms/0-serve-atoms";
import { type NewManiCtx } from "./0-ctx";
import { wizardFirstPage } from "./8-step-items-data";

export function create_DoInitNewManiCtxAtom() {
    return atom(
        null,
        (get, set, { ctx }: { ctx: NewManiCtx; }) => {
            set(ctx.pageAndDirectionAtom, [wizardFirstPage, 0]);

            set(ctx.appSelectedIdxAtom, -1);
            set(ctx.createAsManualAtom, false);

            set(doSetScreenshotsAtom, { width: defaultScreenshotWidth });

            set(doInitNewManiContentAtom);

            ctx.appsScrollPos.setTop(0);

            if (ctx.lastSelectedHwnd) {
                const items = get(allScreenshotAtom);
                const newIdx = items.findIndex(info => info.item.hwnd === ctx.lastSelectedHwnd);
                set(ctx.appSelectedIdxAtom, newIdx);
                //TODO: we need to scroll to the selected item as well
            }
        }
    );
}

export type DoInitNewManiCtxAtom = ReturnType<typeof create_DoInitNewManiCtxAtom>;
