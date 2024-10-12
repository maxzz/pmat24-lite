import { type ChangeEvent, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom, maniMenuOpenAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { type DropdownMenuItemOpenProps } from "./9-types";

const openFoldersId = 'open-folders';

export function DropdownMenuItem_Folder_FromRenderer({ children }: DropdownMenuItemOpenProps) {
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
    const [dlgOpen, setDlgOpen] = useState(false);

    function onClickToOpen() {
        setDlgOpen(true);
    }

    function onFocus() {
        dlgOpen && setMenuOpen(false);
        setDlgOpen(false);
    }

    return (
        <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={onFocus}
        >
            <label htmlFor={openFoldersId} onClick={onClickToOpen}>
                {children}
            </label>
        </DropdownMenuItem>
    );
}

/**
 * This component is used in the main menu to open files and folders from trigger that exists always 
 * and can be target for DropdownMenuItem_Folder_FromRenderer label.
 */
export function MenuItems_Persistent() {
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
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
