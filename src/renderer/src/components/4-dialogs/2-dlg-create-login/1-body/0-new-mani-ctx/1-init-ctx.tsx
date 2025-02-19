import { atom, type Setter } from "jotai";
import { type NewManiCtx } from "./0-ctx";
import { wizardFirstPage } from "./8-step-items-data";
import { allScreenshotAtom, defaultScreenshotWidth, doSetScreenshotsAtom } from "@/store/7-napi-atoms";

export function create_DoInitNewManiCtxAtom() {
    return atom(
        null,
        (get, set, {ctx}: {ctx: NewManiCtx}) => {
            set(ctx.pageAndDirectionAtom, [wizardFirstPage, 0]);
            set(ctx.appSelectedIdxAtom, -1);
            set(doSetScreenshotsAtom, { width: defaultScreenshotWidth });

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

export function clearManiCtxManiData(newManiCtx: NewManiCtx, set: Setter) {
    set(newManiCtx.maniXmlAtom, undefined);
    set(newManiCtx.fileUsAtom, undefined);
}
