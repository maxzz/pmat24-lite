import { useSetAtom } from "jotai";
import { hasMain, sendToMain } from "@/xternal-to-main";
import { doDialogFilesAtom, doGetTargetHwndAtom } from "@/store";
import { IconMenuHamburger } from "@/ui/icons";
import { Button } from "@/ui/shadcn";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { InputFileAsDlg } from "@/ui/shadcn/input-type-file";
import { ReactNode, useState } from "react";

type DropdownMenuItemWithInputFileAsDlgProps = {
    setMenuOpen: (v: boolean) => void;
    onFiles: (files: File[]) => void;
    children: ReactNode;
    openFolder?: boolean;
};

function DropdownMenuItemWithInputFileAsDlg({ setMenuOpen, onFiles, children, openFolder }: DropdownMenuItemWithInputFileAsDlgProps) {
    const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);
    // const doDialogFiles = useSetAtom(doDialogFilesAtom);
    return (
        <DropdownMenuItem asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={(e) => {
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
                        // event.target.files && doDialogFiles([...event.target.files]);
                        event.target.files && onFiles([...event.target.files]);
                        setMenuOpen(false);
                    }}
                />
                {children}
            </label>
        </DropdownMenuItem>
    );
}

function DropdownMenuItemWithInputFolderAsDlg({ setMenuOpen, onFiles, children, openFolder }: DropdownMenuItemWithInputFileAsDlgProps) {
    const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);
    // const doDialogFiles = useSetAtom(doDialogFilesAtom);
    return (
        <DropdownMenuItem asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={(e) => {
                if (fileDlgOpen) {
                    setMenuOpen(false);
                }
                setFileDlgOpen(false);
            }}
        >
            <label htmlFor="open-folders" onClick={() => setFileDlgOpen(true)}>
                {/* <InputFileAsDlg
                    accept=".dpm,.dpn"
                    openFolder={openFolder}
                    onChange={(event) => {
                        // event.target.files && doDialogFiles([...event.target.files]);
                        event.target.files && onFiles([...event.target.files]);
                        setMenuOpen(false);
                    }}
                /> */}
                {children}
            </label>
        </DropdownMenuItem>
    );
}

export function DropdownMenuDemo() {
    const [open, setOpen] = useState<boolean>(false);
    // const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);

    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    const doDialogFiles = useSetAtom(doDialogFilesAtom);
    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button className="px-0.5" variant="outline" size="xs">
                    <IconMenuHamburger className="size-6" />

                    <InputFileAsDlg
                        id="open-folders"
                        accept=".dpm,.dpn"
                        openFolder={true}
                        onChange={(event) => {
                            // event.target.files && doDialogFiles([...event.target.files]);
                            event.target.files && doDialogFiles([...event.target.files]);
                            setOpen(false);
                        }}
                    />

                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-42 text-xs" align="start">

                {hasMain()
                    ? (
                        <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog" })}>
                            Open Files...
                        </DropdownMenuItem>
                    )
                    : (
                        <DropdownMenuItemWithInputFileAsDlg setMenuOpen={setOpen} onFiles={(files) => doDialogFiles(files)}>
                            Open Files...
                        </DropdownMenuItemWithInputFileAsDlg>
                        // <DropdownMenuItem asChild
                        //     onSelect={(e) => e.preventDefault()}
                        //     onFocus={(e) => {
                        //         if (fileDlgOpen) {
                        //             setOpen(false);
                        //         }
                        //         setFileDlgOpen(false);
                        //     }}
                        // >
                        //     <label>
                        //         <InputFileAsDlg
                        //             accept=".dpm,.dpn"
                        //             openFolder={false}
                        //             onClick={() => setFileDlgOpen(true)}
                        //             onChange={(event) => {
                        //                 event.target.files && doDialogFiles([...event.target.files]);
                        //                 setOpen(false);
                        //             }}
                        //         />
                        //         Open Folder2...
                        //     </label>
                        // </DropdownMenuItem>
                    )
                }

                {hasMain()
                    ? (
                        <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", opendirs: true })}>
                            Open Folder...
                        </DropdownMenuItem>
                    )
                    : (
                        <DropdownMenuItemWithInputFolderAsDlg setMenuOpen={setOpen} onFiles={(files) => doDialogFiles(files)} openFolder={true}>
                            Open Folder...
                        </DropdownMenuItemWithInputFolderAsDlg>
                    )
                }

                {/* <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", opendirs: true })}>
                    Open Folder...
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="text-xs">
                            <DropdownMenuItem
                                onClick={() => {
                                    console.log('click');
                                    doGetTargetHwnd();
                                }}
                            >
                                Get Second Active Window
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    console.log('click trace');
                                    sendToMain({ type: 'r2m:test' });
                                }}
                            >
                                Get trace
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                            >
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                >
                    Exit
                </DropdownMenuItem>

                {/* <DropdownMenuSeparator /> */}


                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem> */}

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
