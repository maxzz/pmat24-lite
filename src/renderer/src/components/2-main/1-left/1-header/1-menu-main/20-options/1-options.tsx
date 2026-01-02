import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { DropdownMenuItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { menuShortcutClasses } from "@/ui/local-ui";
import { appSettings } from "@/store/9-ui-state";
import { Check } from "lucide-react";
import { ZoomControl } from "./2-zoom-control";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Preferences
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56">

                <ThemeSubMenu />
                <ZoomControl />
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-xs" onClick={() => doOpenOptionsDialog(true)} disabled={noOpenFolder}>
                    Settings
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openOptions.text}</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}

function ThemeSubMenu() {
    const snapAppUi = useSnapshot(appSettings.appUi);
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-xs">Theme</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <DropdownMenuItem className="text-xs" onClick={() => appSettings.appUi.theme = 'light'}>
                    Light
                    {snapAppUi.theme === 'light' && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => appSettings.appUi.theme = 'dark'}>
                    Dark
                    {snapAppUi.theme === 'dark' && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => appSettings.appUi.theme = 'system'}>
                    System
                    {snapAppUi.theme === 'system' && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}
