import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";

import { R_PanelMenuMani } from "../1-menu-mani";
import { R_PanelMenuFc } from "../2-menu-fc";

export function R_PanelMenu() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <IconMenuHamburger5 className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">

                <R_PanelMenuMani />
                <R_PanelMenuFc />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// export function ManiBody() {
//     const fileUsAtom = useAtomValue(rightPanelAtom);
//     if (!fileUsAtom) {
//         return null;
//     }
//     return (
//         <ManiBodyGuarded fileUsAtom={fileUsAtom} />
//     );
// }
