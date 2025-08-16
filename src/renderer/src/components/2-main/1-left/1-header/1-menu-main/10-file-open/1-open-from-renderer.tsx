import { type ChangeEvent } from "react";
import { useSetAtom } from "jotai";
import { hasMain } from "@/xternal-to-main";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { doSetFilesFrom_LegacyDlg_Atom, doSetFilesFrom_ModernDlg_Atom, isFsSupported } from "@/store/1-files-atoms";

const IdOpenFiles = 'tm-dlg-open-files';
const IdOpenFolders = 'tm-dlg-open-folders';

type doSetFilesFromModernDialogFn = ({ openAsFolder }: { openAsFolder: boolean; }) => void;

export function DropdownMenuItem_Open_FromRenderer({ openAsFolder }: { openAsFolder?: boolean; }) {
    const doSetFilesFromModernDialog = useSetAtom(doSetFilesFrom_ModernDlg_Atom);
    return (
        <DropdownMenuItem asChild>
            <div onClick={() => onClickToOpenFilesDialog(doSetFilesFromModernDialog, openAsFolder)}>
                {openAsFolder ? 'Open Folder...' : 'Open Files... (advanced)'}
            </div>
        </DropdownMenuItem>
    );
}

export function onClickToOpenFilesDialog(openModernDialog: doSetFilesFromModernDialogFn, openAsFolder?: boolean) {
    const doLegacy = hasMain() || !isFsSupported(window); // hasMain() to get full path from electron. isFsSupported() i.e not Firefox. File object cannot be JS modified, so for hasMain() we use legacy dialog.
    if (doLegacy) {
        const id = openAsFolder ? IdOpenFolders : IdOpenFiles;
        document.getElementById(id)?.click();
    } else {
        openModernDialog({ openAsFolder: !!openAsFolder });
    }
}

/**
 * This component is now global and handles file open events even if the UI is no longer displayed.
 */
export function OpenFilesPersistentInput({ openAsFolder }: { openAsFolder?: boolean; }) {
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFrom_LegacyDlg_Atom);
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
