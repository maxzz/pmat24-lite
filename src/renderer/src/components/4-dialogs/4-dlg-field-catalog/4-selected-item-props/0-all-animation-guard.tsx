import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { AnimatePresence, motion, MotionConfig, type Transition } from "motion/react";
import { type FceCtx, showPropsAtom } from "@/store/3-field-catalog-atoms";
import { SelectedItemPropsBody } from "./1-props-body";

type RightPanelGuardProps = {
    fceCtx: FceCtx;
    className?: string;
};

const transition: Transition = { ease: "easeInOut", duration: 0.2 };

const panelClasses = "min-w-44 text-xs bg-background border-border border rounded-e shadow flex flex-col overflow-hidden";

export function RightPanelGuard({ fceCtx, className }: RightPanelGuardProps) {
    const showProps = useAtomValue(showPropsAtom);
    return (<>
        <MotionConfig transition={transition}>
            <AnimatePresence initial={false}>

                {showProps && (
                    <motion.div
                        initial={{ x: -30, opacity: 0, width: 0 }}
                        animate={{ x: 4, opacity: 1, width: "auto" }}
                        exit={{ x: -30, opacity: 0, width: 0 }}
                        transition={transition}
                        key="right-panel"

                        className={classNames(panelClasses, className)}
                    >
                        <SelectedItemPropsBody fceCtx={fceCtx} />
                    </motion.div>
                )}
                
            </AnimatePresence>
        </MotionConfig>
    </>);
}
