import { atom } from "jotai";

export type ConfirmationMessages = {
    title: string;
    message: string;
    buttonOk: string,
    buttonCancel: string,
    isDafaultOk: boolean;                       // if true then buttonOk is default otherwise buttonCancel
};

export type ConfirmationData = {
    ui: ConfirmationMessages;
    resolve: (ok: boolean) => void;             // ok or cancel
};

export const doOpenConfirmDialogAtom = atom<ConfirmationData | undefined>(undefined);

// export async function doConfirmDialog(data: ConfirmationData) {
//     const ok = await (new Promise<boolean>((resolve) => set(doOpenConfirmDialogAtom, { ui: confirmRemoveFromMruMessages, resolve })));
// }

export const doAsyncConfirmDialogAtom = atom(
    null,
    async (get, set, ui: ConfirmationMessages): Promise<boolean> => {
        const ok = await (new Promise<boolean>((resolve) => set(doOpenConfirmDialogAtom, { ui, resolve })));
        return ok;
    }
);
