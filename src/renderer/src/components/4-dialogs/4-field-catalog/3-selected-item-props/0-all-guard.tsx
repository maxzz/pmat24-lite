import { useAtomValue } from "jotai";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { type SelectedItemAtom, showPropsAtom } from "@/store";
import { SelectedItemBody } from "./1-body";
import { classNames } from "@/utils";

export function RightPanelGuard({ selectedItemAtom, className }: { selectedItemAtom: SelectedItemAtom; className?: string; }) {
    const showProps = useAtomValue(showPropsAtom);
    return (<>
        <MotionConfig transition={{ duration: .20 }}>
            <AnimatePresence initial={false}>
                {showProps && (
                    <motion.div
                        initial={{ x: -30, opacity: 0, width: 0 }}
                        animate={{ x: 4, opacity: 1, width: "auto" }}
                        exit={{ x: -30, opacity: 0, width: 0 }}
                        // transition={{ duration: 0.2 }}
                        transition={{ type:"ease", ease: "easeInOut", duration: 0.2 }}
                        key="right-panel"

                        className={classNames("min-w-40 text-xs bg-background border-border border rounded-e shadow flex flex-col overflow-hidden", className)}
                    >
                        <SelectedItemBody selectedItemAtom={selectedItemAtom} />
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig>
    </>);
}
