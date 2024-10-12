import { maniMenuOpenAtom, doSetFilesFromLegacyDialogAtom } from "@/store";
import { InputFileAsDlg } from "@/ui";
import { useSetAtom } from "jotai";
import type { ChangeEvent } from "react";

export const IdOpenFiles = 'tm-dlg-open-files';
export const IdOpenFolders = 'tm-dlg-open-folders';

/**
 * This component is used in the main menu to open files and folders from trigger that exists always
 * and can be target for DropdownMenuItem_Folder_FromRenderer label.
 */

export function MenuItems_Persistent_Files() {
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        doSetFilesFromLegacyDialog(event.target.files);
        setMenuOpen(false);

        // clear the input value to allow the same folder to be opened again
        const input = document.getElementById(IdOpenFolders) as HTMLInputElement;
        input && (input.value = '');
    }

    return (
        <InputFileAsDlg
            id={IdOpenFiles}
            // ref={ref}
            accept=".dpm,.dpn"
            onChange={onChange}
            openAsFolder={false}
        />
    );
}

export function MenuItems_Persistent_Folder() {
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        doSetFilesFromLegacyDialog(event.target.files);
        setMenuOpen(false);

        // clear the input value to allow the same folder to be opened again
        const input = document.getElementById(IdOpenFolders) as HTMLInputElement;
        input && (input.value = '');
    }

    return (
        <InputFileAsDlg id={IdOpenFolders} openAsFolder={true} onChange={onChange} />
    );
}
