import { useSetAtom } from "jotai";
import { hasMain, sendToMain } from "@/xternal-to-main";
import { doGetTargetHwndAtom } from "@/store";
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
import { FileInputDlg } from "@/xternal-to-main/commands/20-web-open-files";
import { useState } from "react";

export function DropdownMenuDemo() {
    const [open, onOpenChange] = useState<boolean>(false);
    const [fileDlgOpen, setFileDlgOpen] = useState<boolean>(false);
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button className="px-0.5" variant="outline" size="xs">
                    <IconMenuHamburger className="size-6" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-42 text-xs" align="start" onFocusOutside={() => {
                console.log('onFocusOutside');
            }}>

                {hasMain()
                    ? (
                        <DropdownMenuItem onClick={() => {
                            sendToMain({ type: "r2m:file:load-manifests-dialog" });
                        }}>
                            Open Files...
                        </DropdownMenuItem>
                    )
                    : (
                        <DropdownMenuItem asChild
                            onSelect={(e) => {
                                console.log('menuitem click', e);

                                e.preventDefault();
                                // onOpenChange(false);
                                // setTimeout(() => {
                                //     console.log('timeout');
                                //     onOpenChange(false);
                                // }, 1000);
                            }}
                            onFocus={(e) => {
                                console.log('menuitem focus', e);
                                if (fileDlgOpen) {
                                    onOpenChange(false);
                                }
                                setFileDlgOpen(false);
                            }}
                        >
                            <label>
                                <FileInputDlg
                                    openFolder={false}
                                    onChangeDone={(event) => {
                                        onOpenChange(false);
                                        // event.preventDefault();
                                    }}
                                    onClick={(event) => {
                                        console.log('FileInputDlg onClick', event);
                                        setFileDlgOpen(true);
                                        //event.preventDefault();
                                        // onOpenChange(false);
                                    }}
                                />
                                <>
                                    {/* <div className="">Open Folder2...</div> */}
                                    Open Folder2...
                                </>
                            </label>
                        </DropdownMenuItem>
                    )
                }

                {/* <label>
                    <FileInputDlg openFolder={false} />

                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <>
                            {/* <div className="">Open Folder2...</div> * /}
                            Open Folder2...
                        </>
                    </DropdownMenuItem>
                </label> */}


                {/* : (
                <Button asChild>
                    <DropdownMenuItem asChild>
                        <label className="cursor-pointer">
                            <FileInputDlg openFolder={false} />
                            <div className="">Open Folder2...</div>
                        </label>
                    </DropdownMenuItem>
                </Button>
                ) */}

                {/* <DropdownMenuItem asChild>
                    <label className="cursor-pointer">
                        <FileInputDlg openFolder={false} />
                        <div className="">Open Folder2...</div>
                    </label>
                </DropdownMenuItem> */}

                <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", opendirs: true })}>
                    Open Folder...
                </DropdownMenuItem>

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
