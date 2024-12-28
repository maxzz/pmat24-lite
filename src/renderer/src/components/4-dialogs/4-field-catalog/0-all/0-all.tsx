import { useAtomValue, useSetAtom } from "jotai";
import * as D from "@/ui/shadcn/dialog";
import { doCancelFceDlgAtom, fceDlgTriggerAtom } from "@/store";
import { FceDialogBodySelector } from "./1-dialog-body";
import { overlayClasses } from "../../1-dlg-filter-files";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

const contentMainClasses = "!w-4/5 max-w-4xl";
const contentClasses = "!w-80 min-w-fit max-w-xl";
const contentRestClasses = "\
p-0 \
h-4/5 min-h-[60vh] max-h-[90vh] \
text-xs \
gap-0 \
select-none \
1data-[state=open]:none \
1data-[state=closed]:none \
1data-[state=open]:[animation-duration:200ms] \
1data-[state=closed]:[animation-duration:200ms] \
"; // temp.:  min-h-[60vh] to fit right panel height until it will be floated w/ absolute position

export function FceDialog() {
    const doCancelFceDlg = useSetAtom(doCancelFceDlgAtom);

    const fceCtx = useAtomValue(fceDlgTriggerAtom);
    const openMainDlg = !fceCtx?.inData?.openSelectItemDlg;

    return (
        <D.Dialog open={!!fceCtx} onOpenChange={doCancelFceDlg}>
            <D.DialogContent
                className={classNames(openMainDlg ? contentMainClasses : contentClasses, contentRestClasses)}
                noClose
                hiddenTitle="Field Catalog"
                overlayClasses={overlayClasses}
            >
                <AnimatePresence>
                    {!!fceCtx && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: .3 }}
                            transition={{ duration: .1 }}
                        // className="w-full h-full"
                        >
                            {/* {fceCtx && */}
                            <FceDialogBodySelector fceCtx={fceCtx} />
                            {/* } */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </D.DialogContent>
        </D.Dialog>
    );
}

//TODO: add initial selection
