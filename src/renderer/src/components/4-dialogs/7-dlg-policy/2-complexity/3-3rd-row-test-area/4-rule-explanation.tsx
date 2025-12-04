import { type HTMLAttributes, Fragment } from "react";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames } from "@/utils";
import { SymbolDot } from "@/ui/icons";
import { type PolicyDlgTypes } from "../../0-all";

export function RuleExplanation({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const explanation = useAtomValue(dlgUiCtx.explanationAtom);
    const errorText = useAtomValue(dlgUiCtx.errorTextAtom);
    return (
        <div className="mt-2">
            <AnimatePresence initial={false}>
                {explanation && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-1">
                            Explanation of test password complexity. Password should consist of
                        </div>

                        <div className="pl-4 text-xs grid grid-cols-[auto_1fr] gap-x-2">

                            {explanation.split('\n').filter(Boolean).map(
                                (line, idx) => (
                                    <Fragment key={idx}>
                                        <SymbolDot className="size-4" />
                                        {line}
                                    </Fragment>
                                ))
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ErrorInfo className="font-semibold" errorText={errorText} />
        </div>
    );
}

export function ErrorInfo({ errorText, className, ...rest }: { errorText: string; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("mt-1 min-h-4 text-red-500 select-text", !errorText && "invisible", className)} {...rest}>
            {errorText}
        </div>
    );
}

/*
Explanation:
    Password should consist of
    at least 8 characters,
    including at least one uppercase letter,
    one lowercase letter,
    one number,
    and one special character.
*/
