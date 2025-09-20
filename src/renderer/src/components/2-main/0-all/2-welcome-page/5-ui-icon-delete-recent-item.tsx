import { type HTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { classNames } from "@/utils";
import { SymbolCross } from "@/ui/icons";

export function IconCrossOnHover({ show, className, onClick, ...rest }: { show: boolean; } & HTMLAttributes<HTMLElement> & ComponentPropsWithoutRef<typeof SymbolCross>) {
    return (<>
        <MotionConfig transition= {{ delay: .5, bounce: 1 }} >
            <AnimatePresence initial={false}>
                {show && (
                    <motion.div
                        className={classNames("p-1 origin-center rounded hover:!stroke-4 hover:text-white hover:bg-red-600", className)}
                        initial={{ opacity: 0, scaleY: 0, x: 100 }}
                        animate={{ opacity: 1, scaleY: 1, x: 0}}
                        exit={{ opacity: 0, scaleY: 0, x: 100 }}
                        onClick={onClick}
                        title="Remove this item from the list of recent items"
                    >
                        <SymbolCross className="size-3" {...rest} />
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig>
    </>);
}
