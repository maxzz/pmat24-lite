import { type ConfirmationMessages as ConfirmationMessages } from '@/store';

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
