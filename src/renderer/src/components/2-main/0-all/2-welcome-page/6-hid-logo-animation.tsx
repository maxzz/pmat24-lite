import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IconHIDWFrame, IconHIDWoFrame } from "@/ui/icons";

export function HIDLogoAnimation({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {
    return (
        <motion.div
            className={classNames("", className)}
            initial={{ opacity: 0, scale: 0, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", delay: 3, stiffness: 35, }}
            {...rest}
        >
            {/* <IconHIDWoFrame /> */}
            <IconHIDWFrame className="size-12" />
        </motion.div>
    );
}
