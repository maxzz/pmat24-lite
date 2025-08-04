import { type ReactNode } from "react";
import { atom } from "jotai";

export type ConfirmationUi = {                  //TODO: instead of fixed number of buttons we should use buttons: [string, value][] in order to support more than 2 buttons
    title: string;
    icon?: ReactNode;                           // Icon to show on the left side of of message
    message: ReactNode;
    buttonOk: string,
    buttonCancel?: string,                      // If not defined then buttonCancel is not shown and buttonOk is centered; this is for single close button
    isDafaultOk: boolean;                       // If true then buttonOk is default otherwise buttonCancel
};

export type ConfirmationData = {
    ui: ConfirmationUi;
    resolve: (ok: boolean) => void;             // ok or cancel
};

export const doOpenConfirmDialogAtom = atom<ConfirmationData | undefined>(undefined);

export const doAsyncConfirmDialogAtom = atom(
    null,
    async (get, set, ui: ConfirmationUi): Promise<boolean> => {
        const ok = await (new Promise<boolean>((resolve) => set(doOpenConfirmDialogAtom, { ui, resolve })));
        return ok;
    }
);
