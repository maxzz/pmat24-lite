import { useSnapshot } from "valtio";
import { type ManiAtoms, appSettings, isManualForm, isNormalForm, maniAtiveTabToFormIdx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";
import { MenuItem_Manual_ClearScriptActions, MenuItem_Normal_ShowTextFields } from "./1-show-text-fields-for-match";
import { NoMenu } from "../0-all/1-no-menu";

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
            <MenuItem_ShowXML />
            <DropdownMenuSeparator />
            <MenuItem_More />
        </>);
    }

    if (isManualForm(formCtx)) {
        return (<>
            <MenuItem_Manual_ClearScriptActions formCtx={formCtx} />
            <MenuItem_ShowXML />
            <DropdownMenuSeparator />
            <MenuItem_More />
        </>);
    }

    return <NoMenu />;
}
