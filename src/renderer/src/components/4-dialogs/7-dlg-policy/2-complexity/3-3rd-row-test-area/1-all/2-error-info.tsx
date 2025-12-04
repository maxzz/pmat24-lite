import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";

export function ErrorInfo({ className, errorTextAtom, ...rest }: { errorTextAtom: PA<string>; } & HTMLAttributes<HTMLDivElement>) {
    const errorText = useAtomValue(errorTextAtom);
    return (
        <AnimatePresence>
            {errorText && (
                <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: "0.25rem" }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className={classNames("text-red-500 select-text overflow-hidden", className)}
                    {...rest as any}
                >
                    {errorText}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

//TODO: we show if generated password is valid or not, but we need to show how strong it is as well
