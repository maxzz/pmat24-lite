import { atom } from "jotai";
import { type MFormCnt } from "@/store/1-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./1-select-atoms";
import { swapImmutable } from "@/utils";

export const doSwapItemsAtom = atom(
    null,
    (get, set, cnt: MFormCnt, idxCurrent: number, idxNew: number) => {
        const chuncks = get(cnt.chunksAtom);
        if (idxNew < 0 || idxNew >= chuncks.length) {
            return;
        }

        const newChunks = swapImmutable(chuncks, idxCurrent, idxNew);
        set(cnt.chunksAtom, newChunks);

        set(doSetSelectItemValueAtom, cnt, idxNew, true);
    }
);
