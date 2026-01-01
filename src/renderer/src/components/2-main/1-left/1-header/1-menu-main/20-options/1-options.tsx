import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { DropdownMenuItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/ui/shadcn/dropdown-menu";
import { menuShortcutClasses } from "@/ui/local-ui";
import { appSettings } from "@/store/9-ui-state";
import { R2MCalls } from "@/xternal-to-main";
import { Check } from "lucide-react";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    const snapAppUi = useSnapshot(appSettings.appUi);

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
                
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => appSettings.appUi.theme = 'light'}>
                    Light
                    {snapAppUi.theme === 'light' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => appSettings.appUi.theme = 'dark'}>
                    Dark
                    {snapAppUi.theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => appSettings.appUi.theme = 'system'}>
                    System
                    {snapAppUi.theme === 'system' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>Zoom</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => R2MCalls.zoomCommand('in')}>
                    Zoom In
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.zoomIn.text}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => R2MCalls.zoomCommand('out')}>
                    Zoom Out
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.zoomOut.text}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => R2MCalls.zoomCommand('reset')}>
                    Actual Size
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.zoomReset.text}</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => doOpenOptionsDialog(true)} disabled={noOpenFolder}>
                    Options
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openOptions.text}</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}
