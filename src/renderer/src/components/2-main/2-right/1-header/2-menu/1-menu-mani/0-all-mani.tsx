import { useSnapshot } from "valtio";
import { AnyFormCtx, MFormCtx, type ManiAtoms, NFormCtx, appSettings, isManualForm, isNormalForm, maniAtiveTabToFormIdx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";
import { MenuItem_ClearScriptActions, MenuItem_ShowTextFields } from "./1-show-text-fields-for-match";

export function R_PanelMenuMani({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    return (<>
        <FormCtxGuarded maniAtoms={maniAtoms} />
        <MenuItem_ShowXML />
        <DropdownMenuSeparator />
        <MenuItem_More />
    </>);
}

function FormCtxGuarded({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    const { activeTab } = useSnapshot(appSettings.right.mani);
    const formIdx = maniAtiveTabToFormIdx(activeTab);
    
    const formCtx = formIdx !== undefined && maniAtoms[formIdx];
    if (!formCtx) {
        return null;
    }

    return (
        <Menu_Selector formCtx={formCtx} />
    );
}

function Menu_Selector({ formCtx }: { formCtx: AnyFormCtx; }) {
    if (isNormalForm(formCtx)) {
        return <MenuItem_ShowTextFields formCtx={formCtx} />;
    }
    if (isManualForm(formCtx)) {
        return <MenuItem_ClearScriptActions formCtx={formCtx} />;
    }
    return null;
}
