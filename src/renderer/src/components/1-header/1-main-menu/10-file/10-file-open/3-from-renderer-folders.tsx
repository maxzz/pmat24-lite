import { type ReactNode, useState } from "react";
import { useSetAtom } from "jotai";
import { maniMenuOpenAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";
import { IdOpenFolders } from "./4-menu-items_persistent";

export function DropdownMenuItem_Folder_FromRenderer({ children }: { children: ReactNode; }) {
    const setMenuOpen = useSetAtom(maniMenuOpenAtom);
    const [dlgOpen, setDlgOpen] = useState(false);

    function onClickToOpen() {
        setDlgOpen(true);
    }

    function onFocus() {
        dlgOpen && setMenuOpen(false);
        setDlgOpen(false);
    }

    return (
        <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()}
            onFocus={onFocus}
        >
            <label htmlFor={IdOpenFolders} onClick={onClickToOpen}>
                {children}
            </label>
        </DropdownMenuItem>
    );
}


