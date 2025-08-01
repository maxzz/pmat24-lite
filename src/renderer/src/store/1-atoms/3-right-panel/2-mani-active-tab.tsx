import { FormIdx } from "@/store/manifest";
import { appSettings } from "../../9-ui-state";
import { type ManiTabValue } from "../2-file-mani-atoms/9-types";

export const maniTabValue: Record<ManiTabValue, ManiTabValue> = {
    options: 'options',
    login: 'login',
    cpass: 'cpass',
};

export function setManiActiveTab(tab: ManiTabValue) {
    appSettings.right.mani.activeTab = tab;
}

export function maniAtiveTabToFormIdx(tab: string): FormIdx | undefined {
    return (
        tab === 'login'
            ? 0
            : tab === 'cpass'
                ? 1
                : undefined
    );
}
