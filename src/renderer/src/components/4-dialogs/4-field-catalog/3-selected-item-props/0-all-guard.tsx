import { useAtomValue } from "jotai";
import { AnimatePresence, motion, MotionConfig, type Transition } from "framer-motion";
import { showPropsAtom, type Fce0Ctx } from "@/store";
import { SelectedItemBody } from "./1-body";
import { classNames } from "@/utils";

type RightPanelGuardProps = {
    fceCtx: Fce0Ctx;
    className?: string;
};

const transition: Transition = { type: "ease", ease: "easeInOut", duration: 0.2 };

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

                        className={classNames("min-w-40 text-xs bg-background border-border border rounded-e shadow flex flex-col overflow-hidden", className)}
                    >
                        <SelectedItemBody fceCtx={fceCtx} />
                    </motion.div>
                )}
                
            </AnimatePresence>
        </MotionConfig>
    </>);
}
