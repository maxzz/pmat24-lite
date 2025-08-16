import { atom } from "jotai";
import { type RowInputStateAtom } from "@/ui";
import { type FileUsAtom } from "@/store/store-types";
import { getManiDispNameAtomAtom } from "@/store/2-file-mani-atoms/3-options/2-conv-options";

export type ManiNameDlgData = {
    fileUsAtom: FileUsAtom;             // fileUs to rename
    nameAtom: RowInputStateAtom;        // new name
    startName: string;                  // name when dialog was opened to restore on cancel
    resolve: (ok: boolean) => void;     // ok or cancel
};

const _maniNameDlgDataAtom = atom<ManiNameDlgData | undefined>(undefined); // TODO: show only if name is invalid

export const maniNameDlgDataAtom = atom((get) => get(_maniNameDlgDataAtom));

export const maniNameDlgCloseAtom = atom(
    null,
    (get, set, ok: boolean) => {
        const data = get(_maniNameDlgDataAtom);
        if (!data) {
            return;
        }
        
        set(_maniNameDlgDataAtom, undefined);
        data.resolve(ok);
    }
);

export const doManiNameDlgAtom = atom(
    null,
    async (get, set, fileUsAtom: FileUsAtom): Promise<boolean> => {
        if (!fileUsAtom) {
            return false;
        }

        const nameAtom = set(getManiDispNameAtomAtom, fileUsAtom);
        if (!nameAtom) {
            return false;
        }

        const data: Omit<ManiNameDlgData, 'resolve'> = {
            fileUsAtom,
            nameAtom,
            startName: get(nameAtom).data,
        };

        const resolveName = new Promise<boolean>((resolve) => {
            set(_maniNameDlgDataAtom, { ...data, resolve, });
        });
        
        const ok = await resolveName;

        if (!ok) {
            set(data.nameAtom, (v) => ({ ...v, data: data.startName, error: undefined, touched: false, dirty: false }));
        }

        return ok;
    }
);
