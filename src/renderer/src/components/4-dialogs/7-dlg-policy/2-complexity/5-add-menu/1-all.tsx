import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/ui";
import { MenuAddTrigger } from "./2-button-menu-add";
import { PolicyDlgConv } from "../../0-all/0-conv";
import { ComponentPropsWithoutRef } from "react";

function MenuItem({ label }: { label: string; } & ComponentPropsWithoutRef<typeof DropdownMenuItem>) {
    return (
        <DropdownMenuItem className="text-xs grid grid-cols-[16px,1fr] items-center gap-x-2">
            <div className="1col-start-2">
                {label}
            </div>
        </DropdownMenuItem>
    );
}

export function ButtonMenuAdd({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <div className="focus-within:ring-1 focus-within:ring-ring rounded-md flex items-center">
            <DropdownMenu>
                <MenuAddTrigger />

                <DropdownMenuContent align="start" className="">
                    <MenuItem label="Light" onSelect={(e) => { }} />
                    <MenuItem label="Dark" />
                    <MenuItem label="System" />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
