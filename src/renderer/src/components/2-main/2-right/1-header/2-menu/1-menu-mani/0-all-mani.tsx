import { useSnapshot } from "valtio";
import { type ManiAtoms, appSettings, isManualForm, isNormalForm, maniAtiveTabToFormIdx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { NoMenu } from "../0-all/1-no-menu";
import { MenuItem_More } from "../8-more";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_Manual_ClearScriptActions, MenuItem_Manual_CreateDefaultScriptActions } from "./2-manual-actions-list";
import { MenuItem_Normal_ShowTextFields } from "./1-normal-w32-show-text-fields";
import { MenuItem_InTestMode, MenuItem_InUseMode } from "./3-state-actions";

export function R_PanelMenuMani({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const formIdx = maniAtiveTabToFormIdx(activeTab);

    const formCtx = formIdx !== undefined && maniAtoms[formIdx];
    if (!formCtx) {
        return <NoMenu />;
    }

    if (isNormalForm(formCtx)) {
        return (<>
            <MenuItem_Normal_ShowTextFields formCtx={formCtx} />
            <DropdownMenuSeparator />
            <MenuItem_InTestMode formCtx={formCtx} />
            <MenuItem_InUseMode formCtx={formCtx} />
            <MenuItem_ShowXML />
            {/* <MenuItem_More /> */}
        </>);
    }

    if (isManualForm(formCtx)) {
        return (<>
            <MenuItem_Manual_CreateDefaultScriptActions formCtx={formCtx} />
            <MenuItem_Manual_ClearScriptActions formCtx={formCtx} />
            <DropdownMenuSeparator />
            <MenuItem_InTestMode formCtx={formCtx} />
            <MenuItem_InUseMode formCtx={formCtx} />
            <MenuItem_ShowXML />
            {/* <MenuItem_More /> */}
        </>);
    }

    return <NoMenu />;
}
