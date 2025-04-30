import { atom } from "jotai";

export type ConfirmatiionMessages = {
    title: string;
    message: string;
};

export type ConfirmatiionData = {
    ui: ConfirmatiionMessages;
    resolve: (ok: boolean) => void;             // ok or cancel
};

export const doOpenConfirmDialogAtom = atom<ConfirmatiionData | undefined>(undefined);
