import { atom } from "jotai";
import { type NewManiCtx } from "./0-ctx";
import { wizardFirstPage } from "./8-step-items-data";
import { doSetScreenshotsAtom } from "@/store/7-napi-atoms";

export function create_DoInitNewManiCtxAtom() {
    return atom(
        null,
        (get, set, {ctx}: {ctx: NewManiCtx}) => {
            set(ctx.pageAndDirectionAtom, [wizardFirstPage, 0]);
            set(ctx.appSelectedIdxAtom, -1);
            set(doSetScreenshotsAtom, { hwnd: undefined, width: 300 });
        }
    );
}

export type DoInitNewManiCtxAtom = ReturnType<typeof create_DoInitNewManiCtxAtom>;
