import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IconHIDWoFrame } from "@/ui/icons";

export function HIDLogoAnimation() {
    return (
        <motion.div
            className="absolute right-0.5 bottom-0 p-1.5 w-12 text-foreground/10 rounded"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", delay: 3, duration: 0.7 }}
        >
            <IconHIDWoFrame />
        </motion.div>
    );
}
