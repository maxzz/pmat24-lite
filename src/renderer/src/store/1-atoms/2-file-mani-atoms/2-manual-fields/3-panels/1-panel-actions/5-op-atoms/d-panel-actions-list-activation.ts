import { delay } from "@/utils";
import { FormIdx } from "@/store/manifest";

// Actions list panel activation

export const panelActionsListId = (formIdx: FormIdx) => ({
    'data-panel-actions-list': formIdx,
});

export async function asyncSelectPanelActionsList(formIdx: FormIdx, nDelay: number = 500): Promise<void> {
    const list = document.querySelector<HTMLDivElement>(`[data-panel-actions-list="${formIdx}"]`);
    if (list) {
        await delay(nDelay);
        list.focus();
    }
}
