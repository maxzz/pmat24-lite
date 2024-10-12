import { type ChangeEvent, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { type DropdownMenuItemOpenProps } from "./9-types";

export function DropdownMenuItem_Files_FromRenderer({ setMenuOpen, children }: DropdownMenuItemOpenProps) {
    const [dlgOpen, setDlgOpen] = useState(false);
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    const ref = useRef<HTMLInputElement>(null);

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
            <div className="" onClick={() => {
                setDlgOpen(true);
                ref.current?.click();
            }}>
                {/* <label> */}
                <InputFileAsDlg
                    ref={ref}
                    accept=".dpm,.dpn"
                    //onClick={() => setDlgOpen(true)}
                    onChange={onChange}
                    openAsFolder={false}
                />
                {children}
                {/* </label> */}
            </div>
        </DropdownMenuItem>
    );
}
