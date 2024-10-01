import { ReactNode, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromDialogAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { hasMain, sendToMain } from "@/xternal-to-main";

type DropdownMenuItemWithInputFileAsDlgProps = {
    setMenuOpen: (v: boolean) => void;
    onFiles: (files: File[]) => void;
    children: ReactNode;
};

function DropdownMenuItem_Files_FromRenderer({ setMenuOpen, onFiles, children }: DropdownMenuItemWithInputFileAsDlgProps) {
    const [dlgOpen, setDlgOpen] = useState(false);

    function onFocus() {
        if (dlgOpen) {
            setMenuOpen(false);
        }
        setDlgOpen(false);
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.files && onFiles([...event.target.files]);
        setMenuOpen(false);
    }

    return (
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()} onFocus={onFocus}>
            <label>
                <InputFileAsDlg
                    accept=".dpm,.dpn"
                    onClick={() => setDlgOpen(true)}
                    onChange={onChange}
                    openFolder={false}
                />
                {children}
            </label>
        </DropdownMenuItem>
    );
}

const openFoldersId = 'open-folders';

function DropdownMenuItem_Folder_FromRenderer({ setMenuOpen, children }: DropdownMenuItemWithInputFileAsDlgProps) {
    const [dlgOpen, setDlgOpen] = useState(false);

    function onFocus() {
        if (dlgOpen) {
            setMenuOpen(false);
        }
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
    const doDialogFiles = useSetAtom(doSetFilesFromDialogAtom);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.files && doDialogFiles([...event.target.files]); // Checking the length will prevent false drags and, as a result, clearing the file list.
        setMenuOpen(false);

        // clear the input value to allow the same folder to be opened again
        const input = document.getElementById(openFoldersId) as HTMLInputElement;
        input && (input.value = '');
    }

    return (
        <InputFileAsDlg id={openFoldersId} openFolder={true} onChange={onChange} />
    );
}

export function MenuItems_FileOpen_FromRenderer({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    
    const doSetFilesFromDialog = useSetAtom(doSetFilesFromDialogAtom);

    return (<>
        <DropdownMenuItem_Files_FromRenderer setMenuOpen={setMenuOpen} onFiles={doSetFilesFromDialog}>
            Open Files...
        </DropdownMenuItem_Files_FromRenderer>

        <DropdownMenuItem_Folder_FromRenderer setMenuOpen={setMenuOpen} onFiles={doSetFilesFromDialog}>
            Open Folder...
        </DropdownMenuItem_Folder_FromRenderer>
    </>);
}
