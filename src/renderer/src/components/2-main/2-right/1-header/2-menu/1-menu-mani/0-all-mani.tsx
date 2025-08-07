import { useSnapshot } from "valtio";
import { FormIdx } from "@/store/manifest";
import { type ManiAtoms, appSettings, isManualForm, isNormalForm, maniAtiveTabToFormIdx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { NoMenu } from "../0-all/1-no-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_Manual_ClearScriptActions, MenuItem_Manual_CreateDefaultScriptActions } from "./2-manual-actions-list";
import { MenuItem_Normal_ShowTextFields } from "./1-normal-w32-show-text-fields";
import { MenuItems_State } from "./3-menu-items-state";
import { MenuItem_Cpass } from "./4-menu-items-cpass";
//import { MenuItem_More } from "../8-more";

export function R_PanelMenuMani({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const isOptionsTabOpen = activeTab === 'options';

    const formIdx = isOptionsTabOpen ? 0 : maniAtiveTabToFormIdx(activeTab);
    const formCtx = formIdx !== undefined && maniAtoms[formIdx];

    if (!formCtx) {
        const loginFormCtx = maniAtoms[FormIdx.login];
        if (loginFormCtx) {
            return (<>
                <MenuItem_Cpass maniAtoms={maniAtoms} fileUsCtx={loginFormCtx.fileUsCtx} />
            </>);
        }

        return (<>
            <NoMenu />
        </>);
    }

    if (isOptionsTabOpen) {
        return (<>
            {/* <MenuItem_More /> */}
            <MenuItem_Cpass maniAtoms={maniAtoms} fileUsCtx={formCtx.fileUsCtx} />
            <DropdownMenuSeparator />
            <MenuItems_State fileUsCtx={formCtx.fileUsCtx} />
            <MenuItem_ShowXML />
        </>);
    }

    if (isNormalForm(formCtx)) {
        return (<>
            <MenuItem_Normal_ShowTextFields formCtx={formCtx} />
            <DropdownMenuSeparator />
            <MenuItem_Cpass maniAtoms={maniAtoms} fileUsCtx={formCtx.fileUsCtx} />
            <DropdownMenuSeparator />
            <MenuItems_State fileUsCtx={formCtx.fileUsCtx} />
            <MenuItem_ShowXML />
        </>);
    }

    if (isManualForm(formCtx)) {
        return (<>
            <MenuItem_Manual_CreateDefaultScriptActions formCtx={formCtx} />
            <MenuItem_Manual_ClearScriptActions formCtx={formCtx} />
            <DropdownMenuSeparator />
            <MenuItem_Cpass maniAtoms={maniAtoms} fileUsCtx={formCtx.fileUsCtx} />
            <DropdownMenuSeparator />
            <MenuItems_State fileUsCtx={formCtx.fileUsCtx} />
            <MenuItem_ShowXML />
        </>);
    }

    return <NoMenu />;
}
