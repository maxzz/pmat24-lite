import { atom } from "jotai";
import { IconStopCircle } from "@/ui/icons";
import { type ConfirmationMessages, doAsyncConfirmDialogAtom } from "./2-confirm-delete-atoms";
import { removeFromDirsMru } from "../../1-files/0-files-atom/4-mru-dirs";
import { type PmatFolder } from "../../1-files";

export const confirmDeleteMessages: ConfirmationMessages = {
    title: 'Delete file?',
    message: 'Are you sure you want to delete the manifest file?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const confirmDeleteCpassMessages: ConfirmationMessages = {
    title: 'Delete password change form?',
    message: 'Are you sure you want to delete the password change form?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const confirmDeleteScriptActionsMessages: ConfirmationMessages = {
    title: 'Delete all actions?',
    message: 'Are you sure you want to delete all actions?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const confirmQuitMessages: ConfirmationMessages = {
    title: 'Discard changes and quit?', // 'You have unsaved changes. Do you want to discard them and quit?'
    icon: <IconStopCircle className="size-12 text-red-500" />,
    message: 'You have unsaved changes. Are you sure you want to quit?',
    buttonOk: 'Discard and Quit',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

/**
 * We need to confirm removing item from the MRU list.
 * MRU item maybe not available now, but it will be available later.
 */
export const confirmRemoveFromMruMessages: ConfirmationMessages = {
    title: 'Folder does not exist',
    message: 'Do you want to remove this name from the most recently used list?',
    buttonOk: 'Remove',
    buttonCancel: 'Cancel',
    isDafaultOk: true,
};

export const asyncUdpateMruAtom = atom(null,
    async (get, set, folder: PmatFolder) => {
        const ok = await set(doAsyncConfirmDialogAtom, confirmRemoveFromMruMessages);
        if (ok) {
            removeFromDirsMru(folder);
        }
    }
);
