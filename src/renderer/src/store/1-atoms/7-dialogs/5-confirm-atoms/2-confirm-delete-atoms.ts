import { atom } from "jotai";

export type ConfirmationMessages = {
    title: string;
    message: string;
    buttonOk: string,
    buttonCancel: string,
};

export type ConfirmationData = {
    ui: ConfirmationMessages;
    resolve: (ok: boolean) => void;             // ok or cancel
};

export const doOpenConfirmDialogAtom = atom<ConfirmationData | undefined>(undefined);
