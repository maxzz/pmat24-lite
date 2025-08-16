import { atom } from "jotai";
import { IconStopCircle } from "@/ui/icons";
import { type ConfirmationUi, doAsyncExecuteConfirmDialogAtom } from "./9-types-confirm";
import { type PmatFolder, removeFromDirsMru } from "@/store/5-files";

export const confirmDeleteMessages: ConfirmationUi = {
    title: 'Delete file?',
    message: 'Are you sure you want to delete the manifest file?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const confirmDeleteCpassMessages: ConfirmationUi = {
    title: 'Delete password change form?',
    message: 'Are you sure you want to delete the password change form?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const confirmDeleteScriptActionsMessages: ConfirmationUi = {
    title: 'Delete all actions?',
    message: 'Are you sure you want to delete all actions?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const confirmQuitMessages: ConfirmationUi = {
    title: 'Discard changes and quit?', // 'You have unsaved changes. Do you want to discard them and quit?'
    icon: <IconStopCircle className="size-12 text-red-500" />,
    message: 'You have unsaved changes. Are you sure you want to quit?',
    buttonOk: 'Discard and Quit',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const aboutMessages: ConfirmationUi = {
    title: 'About PMAT',
    message: 'PMAT is developed by the PMAT team.',
    buttonOk: 'OK',
    buttonCancel: undefined,
    isDafaultOk: true,
};

/**
 * We need to confirm removing item from the MRU list.
 * MRU item maybe not available now, but it will be available later.
 */
export const confirmRemoveFromMruMessages: ConfirmationUi = {
    title: 'Folder does not exist',
    message: 'Do you want to remove this name from the most recently used list?',
    buttonOk: 'Remove',
    buttonCancel: 'Cancel',
    isDafaultOk: true,
};

export const asyncUdpateMruAtom = atom(null,
    async (get, set, folder: PmatFolder) => {
        const ok = await set(doAsyncExecuteConfirmDialogAtom, confirmRemoveFromMruMessages);
        if (ok) {
            removeFromDirsMru(folder);
        }
    }
);
