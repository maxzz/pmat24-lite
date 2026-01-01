import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { DropdownMenuItem, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/ui/shadcn/dropdown-menu";
import { Button } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/local-ui";
import { appSettings } from "@/store/9-ui-state";
import { R2MCalls, R2MInvokes, hasMain } from "@/xternal-to-main";
import { Check, Minus, Plus, Maximize } from "lucide-react";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    const snapAppUi = useSnapshot(appSettings.appUi);

    const [zoomLevel, setZoomLevel] = useState(0);

    useEffect(() => {
        if (hasMain()) {
            R2MInvokes.getZoomLevel().then(setZoomLevel).catch(console.error);
        }
    }, []);

    const handleZoom = (action: 'in' | 'out' | 'reset') => {
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
                
                <div className="flex items-center justify-between px-2 py-1.5 select-none">
                    <span className="text-sm font-medium">Zoom</span>
                    <div className="flex items-center">
                        <div className="flex items-center border rounded-md mr-1 border-border">
                             <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-l-md hover:bg-accent" onClick={(e) => { e.preventDefault(); handleZoom('out'); }}>
                                <Minus className="h-3 w-3" />
                             </Button>
                             <span className="w-10 text-center text-xs tabular-nums border-x border-border px-1">{zoomPercent}%</span>
                             <Button variant="ghost" size="icon" className="h-6 w-8 rounded-none rounded-r-md hover:bg-accent" onClick={(e) => { e.preventDefault(); handleZoom('in'); }}>
                                <Plus className="h-3 w-3" />
                             </Button>
                        </div>
                         <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-accent" onClick={(e) => { e.preventDefault(); handleZoom('reset'); }}>
                            <Maximize className="h-3 w-3" />
                         </Button>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => doOpenOptionsDialog(true)} disabled={noOpenFolder}>
                    Options
                    <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openOptions.text}</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}
