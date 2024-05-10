import { ReactNode, useState } from "react";
import { useSetAtom } from "jotai";
import { doSetFilesFromDialogAtom } from "@/store";
import { DropdownMenuItem, InputFileAsDlg } from "@/ui";
import { hasMain, sendToMain } from "@/xternal-to-main";

type DropdownMenuItemWithInputFileAsDlgProps = {
    children: ReactNode;
    openFolder?: boolean;
    setMenuOpen: (v: boolean) => void;
    onFiles: (files: File[]) => void;
};

const openFoldersId = 'open-folders';

function DropdownMenuItem_Files({ setMenuOpen, onFiles, children, openFolder }: DropdownMenuItemWithInputFileAsDlgProps) {
    const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);
    return (
        <DropdownMenuItem asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={() => {
                if (fileDlgOpen) {
                    setMenuOpen(false);
                }
                setFileDlgOpen(false);
            }}
        >
            <label>
                <InputFileAsDlg
                    accept=".dpm,.dpn"
                    openFolder={openFolder}
                    onClick={() => setFileDlgOpen(true)}
                    onChange={(event) => {
                        event.target.files && onFiles([...event.target.files]);
                        setMenuOpen(false);
                    }} />
                {children}
            </label>
        </DropdownMenuItem>
    );
}

function DropdownMenuItem_Folder({ setMenuOpen, children }: DropdownMenuItemWithInputFileAsDlgProps) {
    const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);
    return (
        <DropdownMenuItem asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={() => {
                if (fileDlgOpen) {
                    setMenuOpen(false);
                }
                setFileDlgOpen(false);
            }}
        >
            <label htmlFor={openFoldersId} onClick={() => setFileDlgOpen(true)}>
                {children}
            </label>
        </DropdownMenuItem>
    );
}

export function MenuItems_FileOpen({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    const doSetFilesFromDialog = useSetAtom(doSetFilesFromDialogAtom);
    return (<>
        {hasMain()
            ? (
                <>
                    <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog" })}>
                        Open Files...
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", openDirs: true })}>
                        Open Folder...
                    </DropdownMenuItem>
                </>
            )
            : (
                <>
                    <DropdownMenuItem_Files setMenuOpen={setMenuOpen} onFiles={(files) => doSetFilesFromDialog(files)}>
                        Open Files...
                    </DropdownMenuItem_Files>
                    
                    <DropdownMenuItem_Folder setMenuOpen={setMenuOpen} onFiles={(files) => doSetFilesFromDialog(files)} openFolder={true}>
                        Open Folder...
                    </DropdownMenuItem_Folder>
                </>
            )
        }
    </>);
}

export function MenuItems_Persistent({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    const doDialogFiles = useSetAtom(doSetFilesFromDialogAtom);
    return (<>
        <InputFileAsDlg
            id={openFoldersId}
            openFolder={true}
            onChange={(event) => {
                event.target.files && doDialogFiles([...event.target.files]);
                setMenuOpen(false);

                // clear the input value to allow the same folder to be opened again
                const input = document.getElementById(openFoldersId) as HTMLInputElement;
                input && (input.value = '');
            }}
        />
    </>);
}
