import { atom } from "jotai";
import { type RowInputStateAtom } from "@/ui/local-ui";
import { type FileUsAtom } from "@/store/store-types";

export type ManiNameDlgData = {
    fileUsAtom: FileUsAtom;             // fileUs to rename
    nameAtom: RowInputStateAtom;        // new name
    startName: string;                  // name when dialog was opened to restore on cancel
    resolve: (ok: boolean) => void;     // ok or cancel
};

export const _maniNameDlgDataAtom = atom<ManiNameDlgData | undefined>(undefined); // To set initial data and open the dialog

export const maniNameDlgDataAtom = atom((get) => get(_maniNameDlgDataAtom)); // To check is open and has data

export const maniNameDlgCloseAtom = atom( // To close the dialog
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

// TODO: show only if name is invalid
