import { useAtomValue } from "jotai";
import { AnimatePresence, motion, MotionConfig, type Transition } from "framer-motion";
import { showPropsAtom, type FceCtx } from "@/store";
import { SelectedItemPropsBody } from "@/components/4-dialogs/4-field-catalog/3-selected-item-props/1-props-body";
import { classNames } from "@/utils";

type RightPanelGuardProps = {
    fceCtx: FceCtx;
    className?: string;
};

const transition: Transition = { type: "ease", ease: "easeInOut", duration: 0.2 };

const panelClasses = "";

export function BottomPanelGuard({ fceCtx, className }: RightPanelGuardProps) {
    const showProps = useAtomValue(fceCtx.selectedItemAtom);
    return (<>
        <MotionConfig transition={transition}>
            <AnimatePresence initial={false}>

                {showProps && (
                    <motion.div
                        initial={{ y: -30, opacity: 0, height: 0 }}
                        animate={{ y: 0, opacity: 1, height: "auto" }}
                        exit={{ y: -30, opacity: 0, height: 0 }}
                        transition={transition}
                        key="fce-props-panel"

                        className={classNames(panelClasses, className)}
                    >
                        <SelectedItemPropsBody fceCtx={fceCtx} />
                    </motion.div>
                )}
                
            </AnimatePresence>
        </MotionConfig>
    </>);
}
