import type { ChangeEvent } from "react";
import { useSetAtom } from "jotai";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { doSetFilesFromLegacyDialogAtom } from "@/store";

export const IdOpenFiles = 'tm-dlg-open-files';
export const IdOpenFolders = 'tm-dlg-open-folders';

export function DropdownMenuItem_Open_FromRenderer({ openAsFolder }: { openAsFolder: boolean; }) {

    function onClickToOpen() {
        document.getElementById(openAsFolder ? IdOpenFolders: IdOpenFiles)?.click();
    }

    return (
        <DropdownMenuItem asChild>
            <div onClick={onClickToOpen}>
                {openAsFolder ? 'Open Folder...' : 'Open Files...'}
            </div>
        </DropdownMenuItem>
    );
}

/**
 * This component now is global to handle open files event even when UI is not rendered anymore.
 */
export function OpenFilesPersistentInput({ openAsFolder }: { openAsFolder: boolean; }) {
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);
    const id = openAsFolder ? IdOpenFolders: IdOpenFiles;

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        doSetFilesFromLegacyDialog(event.target.files);

        // clear the input value to allow the same folder to be opened again
        const input = document.getElementById(id) as HTMLInputElement;
        input && (input.value = '');
    }

    return (
        <InputFileAsDlg
            id={id}
            openAsFolder={openAsFolder}
            onChange={onChange}
            accept=".dpm,.dpn"
        />
    );
}
