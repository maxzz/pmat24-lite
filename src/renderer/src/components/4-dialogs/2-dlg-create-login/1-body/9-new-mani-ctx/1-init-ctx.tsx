import { atom } from "jotai";
import { NewManiCtx } from "./0-ctx";
import { wizardFirstPage } from "./8-step-items-data";

export type InitNewManiCtxAtom = ReturnType<typeof createInitNewManiCtxAtom>;

export function createInitNewManiCtxAtom() {
    return atom(
        null,
        (get, set, {ctx}: {ctx: NewManiCtx}) => {
            set(ctx.pageAndDirectionAtom, [wizardFirstPage, 0]);
        }
    );
}
