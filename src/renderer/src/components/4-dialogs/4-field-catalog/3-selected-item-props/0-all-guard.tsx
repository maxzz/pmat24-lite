import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import { type SelectedItemAtom, showPropsAtom } from "@/store";
import { SelectedItemBody } from "./1-body";
import { classNames } from "@/utils";

export function RightPanelGuard({ selectedItemAtom, className }: { selectedItemAtom: SelectedItemAtom; className?: string; }) {
    const showProps = useAtomValue(showPropsAtom);
    return (<>
        <AnimatePresence initial={false}>
            {showProps && (
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}

                    className={classNames("w-[200px] text-xs flex flex-col", className)}
                >
                    {/* <motion.div layout> */}
                        <SelectedItemBody selectedItemAtom={selectedItemAtom} />
                    {/* </motion.div> */}
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}
