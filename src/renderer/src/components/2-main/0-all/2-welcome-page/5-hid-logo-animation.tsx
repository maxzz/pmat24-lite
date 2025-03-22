import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IconHIDWoFrame } from "@/ui/icons";

export function HIDLogoAnimation() {
    return (<>
        <IconHIDWoFrame className="absolute right-0.5 bottom-0 p-1.5 w-12 text-border rounded" />
    </>);
}
