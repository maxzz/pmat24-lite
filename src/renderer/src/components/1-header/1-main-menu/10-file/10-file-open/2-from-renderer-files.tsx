import { type ChangeEvent, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom, maniMenuOpenAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { type DropdownMenuItemOpenProps } from "./9-types";

export function DropdownMenuItem_Files_FromRenderer({ children }: DropdownMenuItemOpenProps) {
    const [dlgOpen, setDlgOpen] = useState(false);
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    const ref = useRef<HTMLInputElement>(null);

    function onClickToOpen() {
        setDlgOpen(true);
        ref.current?.click();
    }

    function onFocus() {
        dlgOpen && setMenuOpen(false);
        setDlgOpen(false);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setMenuOpen(false);
        doSetFilesFromLegacyDialog(event.target.files);
    }

    return (
        <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={onFocus}
        >
            <div className="" onClick={onClickToOpen}>
                <InputFileAsDlg
                    ref={ref}
                    accept=".dpm,.dpn"
                    onChange={onChange}
                    openAsFolder={false}
                />
                {children}
            </div>
        </DropdownMenuItem>
    );
}
