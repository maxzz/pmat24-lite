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
import { MenuItem_Options } from "../20-options";
import { MenuItem_GetSaw, MenuItem_GetTestDirs } from "../21-debug";
import { MenuItem_More } from "../22-more";

export function PreferencesSubMenu() { // Old and maybe won't be used
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Preferences
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent className="text-xs">
                    <MenuItem_Options />
                    <DropdownMenuSeparator />

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Debug
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="text-xs">
                                <MenuItem_GetSaw />
                                <MenuItem_GetTestDirs />
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <MenuItem_More />
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
}
