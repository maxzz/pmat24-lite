import { atom } from "jotai";
import { IconStopCircle } from "@/ui/icons";
import { type ConfirmationUi, doAsyncExecuteConfirmDialogAtom } from "./9-types-confirm";
import { type PmatFolder, clearMruList, removeFromDirsMru } from "@/store/5-1-open-files";

export const confirmDeleteMessages: ConfirmationUi = {
    title: 'Delete template file?',
    message: 'Are you sure you want to delete the template file?',
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

export const confirmCloseFolderMessages: ConfirmationUi = {
    title: 'Discard changes and close folder?', // 'You have unsaved changes. Do you want to discard them and quit?'
    icon: <IconStopCircle className="size-12 text-red-500" />,
    message: 'You have unsaved changes. Are you sure you want to close folder?',
    buttonOk: 'Discard and Close',
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
const confirmRemoveFromMruMessages: ConfirmationUi = {
    title: '',
    message: 'Do you want to remove this name from the most recently used list?',
    buttonOk: 'Remove',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

const confirmRemoveFromMruAllMessages: ConfirmationUi = {
    title: 'Clear the list of MRU folders',
    message: 'Are you sure you want to clear the list of recently opened folders?',
    buttonOk: 'Clear',
    buttonCancel: 'Cancel',
    isDafaultOk: false,
};

export const asyncClearMruListDialogAtom = atom(null,
    async (get, set) => {
        const ok = await set(doAsyncExecuteConfirmDialogAtom, confirmRemoveFromMruAllMessages);
        if (ok) {
            clearMruList();
        }
    }
);

export const asyncRemoveMruItemDialogAtom = atom(null,
    async (get, set, folder: PmatFolder, failed: boolean) => {
        const ok = await set(doAsyncExecuteConfirmDialogAtom, getConfirmRemoveFromMruMessages(failed));
        if (ok) {
            removeFromDirsMru(folder);
        }
    }
);

function getConfirmRemoveFromMruMessages(failed: boolean): ConfirmationUi {
    const rv: ConfirmationUi = {
        ...confirmRemoveFromMruMessages,
        title: failed ? 'The target folder does not exist' : 'Remove item from MRU list?',
    };
    return rv;
}
