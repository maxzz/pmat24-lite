import { type ComponentPropsWithoutRef, type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { BarsLoader, Button } from "@/ui";
import { newManiCtx, wizardLastPage } from "../../0-new-mani-ctx";

export function ControlsScanProgressBar({className, ...rest}: ComponentPropsWithoutRef<"div">) {

    const showProgressBar = useAtomValue(newManiCtx.showControlsScanProgressAtom);
    if (!showProgressBar) {
        return null;
    }

    return (
        <div className={classNames("text-xs flex items-center gap-1", className)} {...rest}>
            Collecting controls...
            <BarsLoader className="w-6 h-4 text-orange-500 [--barh:100%] [--framew:4px] [--speed:1s]" title="Refresh windows list" />
            
            <Button className={cancelButtonClasses} variant="ghost" size="xs" tabIndex={-1}> {/* onClick={() => sendToMain({ type: 'cancel-detection' })} */}
                Cancel
            </Button>
        </div>
    );
}

const cancelButtonClasses = "ml-2 text-white bg-orange-500 hover:text-white hover:bg-orange-600 active:scale-[.97] shadow";
