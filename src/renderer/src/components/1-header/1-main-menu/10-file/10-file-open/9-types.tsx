import type { ReactNode } from "react";

export type DropdownMenuItemOpenProps = {
    setMenuOpen: (v: boolean) => void;
    children: ReactNode;
};
