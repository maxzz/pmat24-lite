import { type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { BarsLoader, Button } from "@/ui";
import { newManiCtx, wizardLastPage } from "../../0-new-mani-ctx";

export function WizardButtons({ className, ...rest }: ComponentProps<"div">) {

    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doAdvancePage = useSetAtom(newManiCtx.doAdvancePageAtom);

    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>

            <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <ProgressBar />
            </div>

            <Button
                variant="outline"
                size="xs"
                onClick={() => doAdvancePage({ next: false })}
                disabled={currentStep <= 0}
            >
                Prev
            </Button>

            <Button
                variant="default"
                size="xs"
                onClick={() => doAdvancePage({ next: true })} // always enabled to show toast as hint
            >
                {currentStep === wizardLastPage ? 'Save' : 'Next'}
            </Button>
        </div>
    );
}

function ProgressBar() {
    return (
        <div className="text-xs flex items-center gap-1">
            Collecting controls...
            <BarsLoader className="w-6 h-4 text-orange-500 [--barh:100%] [--framew:4px] [--speed:3s]" title="Refresh windows list" />
            
            <Button className={cancelButtonClasses} variant="ghost" size="xs" tabIndex={-1}> {/* onClick={() => sendToMain({ type: 'cancel-detection' })} */}
                Cancel
            </Button>
        </div>
    );
}

const cancelButtonClasses = "ml-2 text-white bg-orange-500 hover:text-white hover:bg-orange-600 active:scale-[.97] shadow";
