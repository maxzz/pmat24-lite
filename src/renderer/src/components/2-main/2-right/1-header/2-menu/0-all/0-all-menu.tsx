import { useState } from "react";
import { useAtomValue } from "jotai";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";

import { R_PanelMenuMani } from "../1-menu-mani";
import { R_PanelMenuFc } from "../2-menu-fc";
import { appSettings, fileUsOfRightPanelAtom, rightPanelAtom, RightPanelViewType } from "@/store";

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

                <MenuSelector />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function MenuSelector() {
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    if (!fileUs) {
        return null;
    }

    if (appSettings.right.activeView === RightPanelViewType.xml) {
        return (
            <div className="">TODO XML menu</div>
        );
    }

    if (fileUs.parsedSrc.stats.isFCat) {
        const fceAtoms = fileUs.fceAtoms;
        if (!fceAtoms?.viewFceCtx) {
            return <div className="">no menu</div>;
        }
        return (
            <R_PanelMenuFc fceCtx={fceAtoms.viewFceCtx} />
        );
    }

    // const [maniAtoms, setManiAtoms] = useAtom(fileUs.maniAtomsAtom);

    // if (!maniAtoms) { // maniAtoms not ready yet but will be on the next render
    //     return null;
    // }

    return (<>
        <R_PanelMenuMani />

        {/* <ManiBodyGuarded fileUsAtom={fileUsAtom} /> */}
    </>
    );
}
