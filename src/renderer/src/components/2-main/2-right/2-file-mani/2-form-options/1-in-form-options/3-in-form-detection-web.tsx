import { useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Matching } from "@/store/manifest";
import { SymbolLockClosed, SymbolLockOpen } from "@/ui/icons";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { ShowExampleText, useIsShowExample } from "./5-9-use-is-show-example";
import { MatchHow } from "./5-2-match-how";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {
    const { p2Detect: { ourlAtom, rurlAtom }, howAtom, formIdx } = oFormProps.oAllAtoms.options;
    const [isLocked, setIsLocked] = useState(true);
    const showExample = useIsShowExample(oFormProps.oAllAtoms.options);
    
    const how = useAtomValue(howAtom);
    const disabled = how === Matching.How.undef;
    const showRegex = how === Matching.How.regex;

    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows
                    asTextarea
                    stateAtom={ourlAtom}
                    label={(
                        <div className="flex items-center gap-0.5">
                            Original URL of the website
                            <div className="size-2.5 cursor-pointer" onClick={() => setIsLocked(!isLocked)}>
                                {isLocked
                                    ? <SymbolLockClosed className="size-full" title="This setting is read-only. Only change it if you understand what you're doing." />
                                    : <SymbolLockOpen className="size-full" title="This input can be edited. Please proceed with caution." />
                                }
                            </div>

                        </div>
                    )}
                    labelClasses="font-normal"
                    className={classNames(isLocked ? 'opacity-75 cursor-default' : '')}
                    readOnly={isLocked}
                    onClick={() => isLocked && toast.info("This input is locked by default. Only change it if you understand what you're doing.")}
                    onBlur={() => setIsLocked(true)}
                />

                <div className="mt-2 flex items-center gap-2">
                    <div className="">How to match URL:</div>
                    <MatchHow oFormProps={oFormProps} />
                </div>

                <AnimatePresence>
                    {showRegex && (<>
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: .4 }}
                        >
                            <InputWithTitle2Rows
                                asTextarea
                                stateAtom={rurlAtom}
                                label={showRegex ? "Regular expression" : "Original URL"}
                                labelClasses="font-normal"
                                className={classNames(disabled && 'opacity-50 cursor-default')}
                            />

                            {showExample && <ShowExampleText />}
                        </motion.div>
                    </>)}
                </AnimatePresence>

            </div>
        </AccordionWithTrigger>
    );
}

const textClasses = "pl-6 pr-0.5 py-1";

//TODO: Since we allow to modify original URL in Match URL field, we should should rename "As original URL" to "Match exact string" that includes the original URL domain and protocol, or dissable "Match URL" input in this case.
