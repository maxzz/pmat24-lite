import { useSetAtom } from "jotai";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/ui/shadcn/dropdown-menu";
import { doAboutDialogAtom } from "@/components/4-dialogs/5-confirm";

export function MenuItem_Help() {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Help
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent className="text-xs max-w-56 text-foreground">

                    <MenuItem_About />

                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
}

function MenuItem_About() {
    const doGetGeneralInfo = useSetAtom(doAboutDialogAtom);
    return (<>
        <DropdownMenuItem onClick={() => doGetGeneralInfo()}>
            About
        </DropdownMenuItem>
    </>);
}
