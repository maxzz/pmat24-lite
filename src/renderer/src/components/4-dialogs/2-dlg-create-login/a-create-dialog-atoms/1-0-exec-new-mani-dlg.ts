import { atom } from "jotai";

const _isDlgOpenAtom = atom<NewManiDlgData | undefined>(undefined);

export const close_NewManiDlgAtom = atom(
    null,
    (get, set) => {
        set(_isDlgOpenAtom, undefined);
    }
);

// Execution flow helper

export type NewManiDlgData = {
    resolve: (ok: boolean) => void; // ok or cancel
};

export async function asyncExecuteNewManiDlg(set: Setter): Promise<boolean> {
    const ok = await (new Promise<boolean>(
        (resolve) => {
            set(_isDlgOpenAtom, { resolve, });
        }
    ));
    return ok;
}
