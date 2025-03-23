import { atom } from "jotai";
import { doSetDeliveredFilesAtom } from "../1-do-set-files";
import { setRootDir } from "@/store";

export const doClearFileContentAtom = atom(
    null,
    (get, set) => {
        set(doSetDeliveredFilesAtom, undefined);

        setRootDir({
            rpath: '',
            handle: undefined,
            fromMain: false,
        });
    }
);
