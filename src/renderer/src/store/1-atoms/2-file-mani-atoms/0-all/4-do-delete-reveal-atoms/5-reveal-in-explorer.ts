import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";

export const doRevealInExplorerAtom = atom(null,
    async (get, set, fileUsAtom: FileUsAtom) => {

        if (!hasMain()) {
            console.log('No mainApi');
            return;
        }

        const fileUs = get(fileUsAtom);
        const fpath = fileUs?.fileCnt.fpath;
        const fname = fileUs?.fileCnt.fname;
        if (!fpath || !fname) {
            console.error('No fpath or fname', fileUs);
            return;
        }

        const fullPath = `${fpath}/${fname}`;
        const res = await invokeMainTyped({ type: 'r2mi:reveal-in-explorer', fpath: fullPath });
        if (res) {
            console.error('Reveal error', res);
        }
    }
);

export const doGetFileUsPathAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom): { fpath: string; fname: string; } | undefined => {
        const fileUs = fileUsAtom && get(fileUsAtom);
        const fpath = fileUs?.fileCnt.fpath || '';
        const fname = fileUs?.fileCnt.fname || '';
        return { fpath, fname };
    }
);
