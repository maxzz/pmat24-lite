import { type ChangeEvent, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { DropdownMenuItemOpenProps } from "./9-types";

export function DropdownMenuItem_Files_FromRenderer({ setMenuOpen, children }: DropdownMenuItemOpenProps) {
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
