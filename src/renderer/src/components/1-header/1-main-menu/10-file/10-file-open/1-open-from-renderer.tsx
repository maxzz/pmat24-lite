import { type ChangeEvent } from "react";
import { useSetAtom } from "jotai";
import { hasMain } from "@/xternal-to-main";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { doSetFilesFromLegacyDialogAtom, doSetFilesFromModernDialogAtom, isFsSupported } from "@/store";

export const IdOpenFiles = 'tm-dlg-open-files';
export const IdOpenFolders = 'tm-dlg-open-folders';

type doSetFilesFromModernDialogFn = ({ openAsFolder }: { openAsFolder: boolean; }) => void;

export function DropdownMenuItem_Open_FromRenderer({ openAsFolder }: { openAsFolder?: boolean; }) {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFromModernDialogAtom);
    return (
        <DropdownMenuItem asChild>
            <div onClick={() => onClickToOpenFilesDialog(doSetFilesFromModernDialog, openAsFolder)}>
                {openAsFolder ? 'Open Folder...' : 'Open Files... (temp for debuggins only)'}
            </div>
        </DropdownMenuItem>
    );
}

export function onClickToOpenFilesDialog(openModernDialog: doSetFilesFromModernDialogFn, openAsFolder?: boolean) {
    const isFirefoxWoFs = !isFsSupported(window);
    const id = openAsFolder ? IdOpenFolders : IdOpenFiles;

    if (hasMain() || isFirefoxWoFs) {
        document.getElementById(id)?.click();
    } else {
        openModernDialog({ openAsFolder: !!openAsFolder });
    }
}

/**
 * This component is now global and handles file open events even if the UI is no longer displayed.
 */
export function OpenFilesPersistentInput({ openAsFolder }: { openAsFolder?: boolean; }) {
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);
    const id = openAsFolder ? IdOpenFolders : IdOpenFiles;

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        doSetFilesFromLegacyDialog(event.target.files);

        // clear the input value to allow the same folder to be opened again
        const input = document.getElementById(id) as HTMLInputElement;
        input && (input.value = '');
    }

    return (
        <InputFileAsDlg id={id} openAsFolder={openAsFolder} onChange={onChange} accept=".dpm,.dpn" />
    );
}
