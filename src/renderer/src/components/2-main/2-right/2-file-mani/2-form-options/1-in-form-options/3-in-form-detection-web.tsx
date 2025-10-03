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
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const { p2Detect: { ourlAtom, rurlAtom }, howAtom } = oFormProps.oAllAtoms.options;
    const how = useAtomValue(howAtom);
    const showRegex = how === Matching.How.regex;

    const showExample = useIsShowExample(oFormProps.oAllAtoms.options);
    const disabled = how === Matching.How.undef;

    const [isLocked, setIsLocked] = useState(true);

    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows
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
                    stateAtom={ourlAtom}
                    asTextarea
                    readOnly={isLocked}
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
                                label={how === Matching.How.regex ? "Regular expression" : "Original URL"}
                                labelClasses="font-normal"
                                className={classNames(disabled && 'opacity-50 cursor-default')}
                                stateAtom={rurlAtom}
                                readOnly={disabled}
                                asTextarea
                                onClick={() => disabled && toast.info('This input is disabled because "How to match URL" is set "As original URL".')}
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
const exampleClasses = "text-blue-500";

//TODO: Since we allow to modify original URL in Match URL field, we should should rename "As original URL" to "Match exact string" that includes the original URL domain and protocol, or dissable "Match URL" input in this case.
