import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IconHIDWFrame, IconHIDWoFrame } from "@/ui/icons";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

export function HIDLogoAnimation({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {
    return (
        <motion.div
            className={classNames("", className)}
            initial={{ opacity: 0, scale: 0.2, x: 1000 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", delay: 3, stiffness: 35, }}
            {...rest}
        >
            {/* <IconHIDWoFrame /> */}
            <IconHIDWFrame />
        </motion.div>
    );
}
