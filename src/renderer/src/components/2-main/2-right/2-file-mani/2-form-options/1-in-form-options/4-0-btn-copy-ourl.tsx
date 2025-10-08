import { useState } from "react";
import { useAtomValue } from "jotai";
import { motion, AnimatePresence } from "motion/react";
import { IconCopy, IconL_Check } from "@/ui/icons";
import { RowInputState } from "@/ui/local-ui/1-input-validate";

export function BtnCopyOurl({ ourlAtom }: { ourlAtom: PA<RowInputState>; }) {
    const ourl = useAtomValue(ourlAtom).data;
    const [showCheck, setShowCheck] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(ourl);
        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1000);
    };

    return (<>
        {!!ourl && (
            <div className="absolute right-2 top-7 text-foreground cursor-pointer" onClick={handleCopy}>
                <AnimatePresence mode="wait">
                    {showCheck ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <IconL_Check className="size-4 text-green-500" title="Copied!" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="copy"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <IconCopy className="size-4" title="Copy original URL" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}
    </>);
}
