import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-do-set-files";
import { setRootDir } from "@/store";

export const doCloseRootDirAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, { deliveredFileContents: undefined });
        setRootDir(undefined);
    }
);
