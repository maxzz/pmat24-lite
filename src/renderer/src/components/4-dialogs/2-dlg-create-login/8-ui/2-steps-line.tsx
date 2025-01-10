import { motion } from "framer-motion";

export function StepConnector({ step, currentStep }: { step: number; currentStep: number; }) {
    let status =
        currentStep <= step + 1
            ? "inactive"
            : "complete";
    return (
        <motion.div animate={status}
            className={lineClasses}
            variants={lineVariants}
            transition={{ duration: 0.6, delay: 0.2, type: "tween", ease: "circOut", }}
        />
    );
}

const lineClasses = "\
relative w-12 h-1 \
bg-blue-200 \
-1z-10 \
";

const lineVariants = {
    inactive: {
        backgroundColor: "#fff", // neutral
        transition: { delay: 0, duration: 1.2, },
    },
    complete: {
        backgroundColor: "#3b82f6", // blue-500
    },
};
