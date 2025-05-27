import { FormIdx } from "@/store/manifest";
import { appSettings } from "../../9-ui-state";

export type ManiTabValue = 'options' | 'login' | 'cpass';

export const maniTabValue: Record<ManiTabValue, ManiTabValue> = {
    options: 'options',
    login: 'login',
    cpass: 'cpass',
};

export function setManiActiveTab(tab: ManiTabValue) {
    appSettings.right.mani.activeTab = tab;
}

export function maniAtiveTabToFormIdx(tab: ManiTabValue): FormIdx | undefined {
    return (
        tab === 'options'
            ? undefined
            : tab === 'cpass'
                ? 1
                : 0
    );
}
