import { Button } from "@/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { newManiCtx, doMoveWizardPageAtom } from "../../9-new-mani-ctx";
import { stepItems } from "../1-steps/8-step-items-data";

export function WizardBottomButtons() {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doMoveWizardPage = useSetAtom(doMoveWizardPageAtom);
    return (
        <div className="px-4 flex items-center justify-end gap-1">
            <Button variant="outline" size="xs" onClick={() => doMoveWizardPage({next: false})} disabled={currentStep < 0}>
                Prev
            </Button>
            <Button variant="outline" size="xs" onClick={() => doMoveWizardPage({next: true})} disabled={currentStep >= stepItems.length}>
                Next
            </Button>
        </div>
    );
}
