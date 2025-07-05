import { useState } from "react";
import { useAtomValue } from "jotai";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";
import { type FileUs, appSettings, fileUsOfRightPanelAtom, maniAtomsOfRightPanelAtom, RightPanelViewType } from "@/store";
import { R_PanelMenuMani } from "../1-menu-mani";
import { R_PanelMenuFc } from "../2-menu-fc";
import { R_PanelMenuXml } from "../3-menu-xml";
import { NoMenu } from "./1-no-menu";

export function R_PanelMenu() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <IconMenuHamburger5 className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            {menuOpen && (
                <DropdownMenuContent className="min-w-36 text-xs" align="end">
                    <MenuSelector />
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
}

function MenuSelector() {
    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    if (!fileUs) {
        return <NoMenu />;
    }

    if (appSettings.right.activeView === RightPanelViewType.xml) {
        return (
            <R_PanelMenuXml fileUs={fileUs} />
        );
    }

    if (fileUs.parsedSrc.stats.isFCat) {
        return (
            <MenuForFieldCatalogGuard fileUs={fileUs} />
        );
    }

    return (
        <MenuForManifestGuard />
    );
}

// Guards

function MenuForManifestGuard() {
    const maniAtoms = useAtomValue(maniAtomsOfRightPanelAtom);
    return (<>
        {maniAtoms
            ? <R_PanelMenuMani maniAtoms={maniAtoms} />
            : <NoMenu />
        }
    </>);
}

function MenuForFieldCatalogGuard({ fileUs }: { fileUs: FileUs; }) {
    const fceCtx = fileUs.fceAtomsForFcFile?.viewFceCtx;
    return (<>
        {fceCtx
            ? <R_PanelMenuFc fceCtx={fceCtx} />
            : <NoMenu />
        }
    </>);
}
