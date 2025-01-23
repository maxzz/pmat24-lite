import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { doMoveWizardPageAtom, newManiCtx, stepItems } from "../../9-new-mani-ctx";

export function TestButtons() {
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
