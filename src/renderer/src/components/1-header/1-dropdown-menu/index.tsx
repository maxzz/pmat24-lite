import { doGetTargetHwndAtom, sendToMain } from "@/store";
import { IconMenuHamburger } from "@/ui/icons";
import { Button } from "@/ui/shadcn/button";
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
import { useSetAtom } from "jotai";

export function DropdownMenuDemo() {
    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="px-0.5" variant="outline" size="xs">
                    <IconMenuHamburger className="size-6" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-42 text-xs" align="start">

                <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog" })}>
                    Open Files...
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", opendirs: true })}>
                    Open Folder...
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => {
                        console.log('click trace');
                        sendToMain({ type: 'r2m:test' });
                    }}
                >
                    Get trace
                </DropdownMenuItem>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
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

                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem
                >
                    Settings
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
