import { type ChangeEvent, type ReactNode, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";

type DropdownMenuItemOpenProps = {
    setMenuOpen: (v: boolean) => void;
    children: ReactNode;
};

function DropdownMenuItem_Files_FromRenderer({ setMenuOpen, children }: DropdownMenuItemOpenProps) {
    const [dlgOpen, setDlgOpen] = useState(false);
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    function onFocus() {
        dlgOpen && setMenuOpen(false);
        setDlgOpen(false);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        doSetFilesFromLegacyDialog(event.target.files);
        setMenuOpen(false);
    }

    return (
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()} onFocus={onFocus}>
            <label>
                <InputFileAsDlg
                    accept=".dpm,.dpn"
                    onClick={() => setDlgOpen(true)}
                    onChange={onChange}
                    openAsFolder={false}
                />
                {children}
            </label>
        </DropdownMenuItem>
    );
}

const openFoldersId = 'open-folders';

function DropdownMenuItem_Folder_FromRenderer({ setMenuOpen, children }: DropdownMenuItemOpenProps) {
    const [dlgOpen, setDlgOpen] = useState(false);

    function onFocus() {
        dlgOpen && setMenuOpen(false);
        setDlgOpen(false);
    }

    return (
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()} onFocus={onFocus}>
            <label htmlFor={openFoldersId} onClick={() => setDlgOpen(true)}>
                {children}
            </label>
        </DropdownMenuItem>
    );
}

/**
 * This component is used in the main menu to open files and folders from trigger that exists always 
 * and can be target for DropdownMenuItem_Folder_FromRenderer label.
 */
export function MenuItems_Persistent({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        doSetFilesFromLegacyDialog(event.target.files);
        setMenuOpen(false);

        // clear the input value to allow the same folder to be opened again
        const input = document.getElementById(openFoldersId) as HTMLInputElement;
        input && (input.value = '');
    }

    return (
        <InputFileAsDlg id={openFoldersId} openAsFolder={true} onChange={onChange} />
    );
}

export function MenuItems_FileOpen_FromRenderer({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    return (<>
        <DropdownMenuItem_Files_FromRenderer setMenuOpen={setMenuOpen}>
            Open Files...
        </DropdownMenuItem_Files_FromRenderer>

        <DropdownMenuItem_Folder_FromRenderer setMenuOpen={setMenuOpen}>
            Open Folder...
        </DropdownMenuItem_Folder_FromRenderer>
    </>);
}
