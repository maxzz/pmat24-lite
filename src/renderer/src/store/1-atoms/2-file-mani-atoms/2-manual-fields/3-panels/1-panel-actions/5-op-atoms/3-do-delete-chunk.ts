import { atom } from "jotai";
import { type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { confirmDeleteScriptActionsMessages, doAsyncConfirmDialogAtom } from "@/store/1-atoms/7-dialogs";
import { doSelectIdxAtom } from "./1-select-atoms";

export const doDeleteChunkAtom = atom(
    null,
    (get, set, cnt: MFormCnt, idx: number) => {
        const chunks = get(cnt.chunksAtom);

        const newChunks = [...chunks];
        newChunks.splice(idx, 1);
        set(cnt.chunksAtom, newChunks);

        const newIdx = Math.max(0, Math.min(idx, newChunks.length - 1));
        set(doSelectIdxAtom, cnt, newIdx);
    }
);

export const doDeleteAllChunksAtom = atom(
    null,
    async (get, set, cnt: MFormCnt) => {
        const ok = await set(doAsyncConfirmDialogAtom, confirmDeleteScriptActionsMessages);
        if (!ok) {
            return;
        }

        set(cnt.chunksAtom, []);
        set(doSelectIdxAtom, cnt, -1);
    }
);
