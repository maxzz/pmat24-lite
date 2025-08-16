import { atom } from "jotai";

export const dataToOpen_NewManiDlgAtom = atom((get) => get(_isDlgOpenAtom));
export const close_NewManiDlgAtom = atom(() => null, (get, set) => set(_isDlgOpenAtom, undefined));

export type NewManiDlgData = {
    resolve: (ok: boolean) => void;             // ok or cancel
};

export async function asyncExecuteNewManiDlg(set: Setter): Promise<boolean> {
    const ok = await (new Promise<boolean>((resolve) => { set(_isDlgOpenAtom, { resolve, }); }));
    return ok;
}

const _isDlgOpenAtom = atom<NewManiDlgData | undefined>(undefined);
