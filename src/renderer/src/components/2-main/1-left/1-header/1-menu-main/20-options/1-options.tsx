import { useAtom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { DropdownMenuItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/ui/shadcn/dropdown-menu";
import { menuShortcutClasses } from "@/ui/local-ui";
import { appSettings } from "@/store/9-ui-state";
import { zoomLevelAtom } from "@/store/9-ui-state/8-app-ui";
import { R2MCalls } from "@/xternal-to-main";
import { Check } from "lucide-react";
import { ZoomControl, type ZoomAction } from "./2-zoom-control";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    const snapAppUi = useSnapshot(appSettings.appUi);

    const [zoomLevel, setZoomLevel] = useAtom(zoomLevelAtom);

    const handleZoom = (action: ZoomAction) => {
         R2MCalls.zoomCommand(action);
         
         // Optimistic update
         let newLevel = zoomLevel;
         if (action === 'in') newLevel += 0.5;
         else if (action === 'out') newLevel -= 0.5;
         else newLevel = 0;
         setZoomLevel(newLevel);
    };

    const zoomPercent = Math.round(Math.pow(1.2, zoomLevel) * 100);

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-56">
                
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
                
                <ZoomControl zoomPercent={zoomPercent} onZoom={handleZoom} />

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => doOpenOptionsDialog(true)} disabled={noOpenFolder}>
                    Options
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openOptions.text}</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}
