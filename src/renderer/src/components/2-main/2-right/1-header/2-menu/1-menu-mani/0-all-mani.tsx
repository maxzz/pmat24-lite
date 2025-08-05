import { useSnapshot } from "valtio";
import { type FileUsCtx, type ManiAtoms, appSettings, isManualForm, isNormalForm, maniAtiveTabToFormIdx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { NoMenu } from "../0-all/1-no-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_Manual_ClearScriptActions, MenuItem_Manual_CreateDefaultScriptActions } from "./2-manual-actions-list";
import { MenuItem_Normal_ShowTextFields } from "./1-normal-w32-show-text-fields";
import { MenuItem_InTestMode, MenuItem_InUseMode } from "./3-menu-items-state";
//import { MenuItem_More } from "../8-more";

export function R_PanelMenuMani({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const isOptionsTabOpen = activeTab === 'options';

    const formIdx = isOptionsTabOpen ? 0 : maniAtiveTabToFormIdx(activeTab);
    const formCtx = formIdx !== undefined && maniAtoms[formIdx];
    if (!formCtx) {
        return <NoMenu />;
    }

    if (isOptionsTabOpen) {
        return (<>
            {/* <MenuItem_More /> */}
            <MenuItems_State fileUsCtx={formCtx.fileUsCtx} />
            <MenuItem_ShowXML />
        </>);
    }

    if (isNormalForm(formCtx)) {
        return (<>
            <MenuItem_Normal_ShowTextFields formCtx={formCtx} />
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
            <MenuItems_State fileUsCtx={formCtx.fileUsCtx} />
            <MenuItem_ShowXML />
        </>);
    }

    return <NoMenu />;
}

function MenuItems_State({ fileUsCtx }: { fileUsCtx: FileUsCtx; }) {
    return (<>
        <MenuItem_InTestMode fileUsCtx={fileUsCtx} />
        <MenuItem_InUseMode fileUsCtx={fileUsCtx} />
    </>);
}
