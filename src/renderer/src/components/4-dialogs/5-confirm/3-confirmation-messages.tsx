import { type ConfirmationMessages as ConfirmationMessages } from '@/store';

export const confirmDeleteMessages: ConfirmationMessages = {
    title: 'Delete file?',
    message: 'Are you sure you want to delete the manifest file?',
    buttonOk: 'Delete',
    buttonCancel: 'Cancel',
};

export const confirmRemoveNewMruItemMessages: ConfirmationMessages = {
    title: 'Folder does not exist',
    message: 'Remove this folder from the most recently used list?',
    buttonOk: 'Remove',
    buttonCancel: 'Cancel',
};
