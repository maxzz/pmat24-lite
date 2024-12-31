import { useAtomValue, useSetAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { doCancelFceDlgAtom, fceDlgTriggerAtom } from "@/store";
import { FceDialogBodySelector } from "./1-dialog-body";
import { overlayClasses } from "../../1-dlg-filter-files";
import { classNames } from "@/utils";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

const contentMainClasses = "!w-4/5 max-w-4xl";
const contentClasses = "!w-80 min-w-fit max-w-xl";
const contentRestClasses = "\
p-0 \
h-4/5 min-h-[60vh] max-h-[90vh] \
text-xs \
gap-0 \
select-none \
data-[state=open]:[animation:none] \
data-[state=closed]:[animation:none] \
1data-[state=open]:[animation-duration:200ms] \
data-[state=closed]:[animation-duration:200ms] \
"; // temp.:  min-h-[60vh] to fit right panel height until it will be floated w/ absolute position

export function FceDialog() {
    const doCancelFceDlg = useSetAtom(doCancelFceDlgAtom);

    const fceCtx = useAtomValue(fceDlgTriggerAtom);
    const openMainDlg = !fceCtx?.inData?.openItemPickerDlg;

    return (
        <D.Dialog open={!!fceCtx} onOpenChange={doCancelFceDlg}>
            {/* <MotionConfig transition={{ type: "spring", duration: .7 }}> */}
            <AnimatePresence>
                {!!fceCtx && (
                    //{/* We need to scale Prim.Content right after DialogPortal */ }
                    <motion.div
                        initial={{ opacity: 0, scale: .5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: .3 }}
                        transition={{ duration: 3.3 }}
                        layout
                        layoutId="fc-dlg-body"
                    // className="w-full h-full"
                    >
                        {/* {fceCtx && */}
                        <D.DialogContent
                            className={classNames(openMainDlg ? contentMainClasses : contentClasses, contentRestClasses)}
                            noClose
                            hiddenTitle="Field Catalog"
                            overlayClasses={overlayClasses}
                            // forceMount
                        >
                            {/* <motion.div className="w-full h-full" layout="size" transition={{ duration: .3 }}> */}
                            {/* {fceCtx && */}
                            <FceDialogBodySelector fceCtx={fceCtx} />
                            {/* } */}
                        </D.DialogContent>
                        {/* } */}
                    </motion.div>

                    // {/* </motion.div> */}
                )}
            </AnimatePresence>
            {/* </MotionConfig> */}
        </D.Dialog >
    );
}

//TODO: add initial selection
