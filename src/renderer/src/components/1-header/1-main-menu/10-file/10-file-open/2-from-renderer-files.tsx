import { useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromLegacyDialogAtom, maniMenuOpenAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";
import { IdOpenFiles } from "./4-menu-items_persistent";

export function DropdownMenuItem_Files_FromRenderer({ openFolder }: { openFolder: boolean; }) {
    const [dlgOpen, setDlgOpen] = useState(false);
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
    const doSetFilesFromLegacyDialog = useSetAtom(doSetFilesFromLegacyDialogAtom);

    const ref = useRef<HTMLInputElement>(null);

    function onClickToOpen() {
        setDlgOpen(true);
        //ref.current?.click();
        const input = document.getElementById(IdOpenFiles);
        input && input.click();
    }

    // function onFocus() {
    //     dlgOpen && setMenuOpen(false);
    //     setDlgOpen(false);
    // }

    // function onChange(event: ChangeEvent<HTMLInputElement>) {
    //     setMenuOpen(false);
    //     doSetFilesFromLegacyDialog(event.target.files);
    // }

    return (
        <DropdownMenuItem
            asChild
            // onSelect={(e) => e.preventDefault()}
            // onFocus={onFocus}
        >
            <div className="" onClick={onClickToOpen}>
                {/* <InputFileAsDlg
                    ref={ref}
                    accept=".dpm,.dpn"
                    onChange={onChange}
                    openAsFolder={false}
                /> */}
                {openFolder ? 'Open Folder...' : 'Open Files...'}
            </div>
        </DropdownMenuItem>
    );
}
