import { useState } from "react";
import { useAtomValue } from "jotai";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";
import { appSettings, RightPanelViewAs } from "@/store/9-ui-state";
import { fileUsOfRightPanelAtom, maniAtomsOfRightPanelAtom } from "@/store/5-3-right-panel";
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
    const maniAtoms = useAtomValue(maniAtomsOfRightPanelAtom);

    const fileUs = useAtomValue(fileUsOfRightPanelAtom);
    if (!fileUs) {
        return <NoMenu />;
    }

    if (appSettings.right.activeView === RightPanelViewAs.xml) {
        return (
            <R_PanelMenuXml fileUs={fileUs} />
        );
    }

    if (fileUs.parsedSrc.stats.isFCat) {
        const fceCtx = fileUs.fceAtomsForFcFile?.viewFceCtx;
        return (<>
            {fceCtx
                ? <R_PanelMenuFc fceCtx={fceCtx} />
                : <NoMenu />
            }
        </>);
    }

    return (<>
        {maniAtoms
            ? <R_PanelMenuMani maniAtoms={maniAtoms} />
            : <NoMenu />
        }
    </>);
}
