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
                    <MenuItem_OpenOnlineHelp label="PMAT documentation" url="https://docs.hidglobal.com/digitalpersona-v4.3.0/ad/admin/password-manager-admin-tool.htm" />
                    <MenuItem_OpenOnlineHelp label="Managing credentials" url="https://docs.hidglobal.com/digitalpersona-v4.3.0/ad/user/credential-management.htm" />
                    <DropdownMenuSeparator />
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

function MenuItem_OpenOnlineHelp({label, url}: { label: string; url: string; }) {
    function OpenOlineHelpUrl() {
        window.open(url, "_blank");
    }
    return (<>
        <DropdownMenuItem onClick={OpenOlineHelpUrl}>
            {label}
        </DropdownMenuItem>
    </>);
}
