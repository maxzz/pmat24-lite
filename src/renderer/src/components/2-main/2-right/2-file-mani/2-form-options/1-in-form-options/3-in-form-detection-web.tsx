import { useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { notice } from "@/ui/local-ui/7-toaster";
import { Matching } from "@/store/8-manifest";
import { SymbolInfo, SymbolLockClosed, SymbolLockOpen } from "@/ui/icons";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { ShowExampleText, useIsShowExample } from "./5-9-use-is-show-example";
import { MatchHow } from "./5-2-match-how";
import { RegexTooltip } from "./5-3-regex-tooltip";
import { BtnCopyOurl } from "./4-0-btn-copy-ourl";
import { FormIconPosition } from "./3-in-form-icon-position";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {
    const { p2Detect: { ourlAtom }, formIdx, murl_howAtom, murl_regexAtom } = oFormProps.oAllAtoms.options;
    const [isLocked, setIsLocked] = useState(true);
    const showExample = useIsShowExample(oFormProps.oAllAtoms.options);

    const murl_how = +useAtomValue(murl_howAtom).data;
    const disabled = murl_how === Matching.How.undef;
    const showRegex = murl_how === Matching.How.regex;

    return (<>
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <div className="relative">
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
                        onClick={() => isLocked && notice.info("This input is locked by default. Only change it if you understand what you're doing.")}
                        /** /
                        onClick={() => {
                            notice.error("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
                            notice.warning("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
                            notice.success("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
                            notice.info("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
                            notice("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
                        }}
                        /**/
                        onBlur={() => setIsLocked(true)}
                    />
                    <BtnCopyOurl ourlAtom={ourlAtom} />
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <div className="">How to match the website URL:</div>
                    <MatchHow oFormProps={oFormProps} />
                </div>

                <AnimatePresence initial={false}>
                    {showRegex && (<>
                        <motion.div
                            initial={{ opacity: 0, x: 1000, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: .3 }}
                            className="relative"
                        >
                            {/* <SymbolInfo className="absolute right-2 top-7 size-4 text-foreground/75" /> */}
                            <RegexTooltip />

                            <InputWithTitle2Rows
                                asTextarea
                                stateAtom={murl_regexAtom}
                                label={showRegex ? "Regular expression" : "Original URL"}
                                labelClasses="font-normal"
                                className={classNames(disabled && 'opacity-50 cursor-default')}
                            />

                            {showExample && <ShowExampleText murl_regexAtom={murl_regexAtom} />}
                        </motion.div>
                    </>)}
                </AnimatePresence>

            </div>
        </AccordionWithTrigger>

        <FormIconPosition oFormProps={oFormProps} />
    </>);
}

const textClasses = "pl-6 pr-0.5 py-1";

//TODO: Since we allow to modify original URL in Match URL field, we should should rename "As original URL" to "Match exact string" that includes the original URL domain and protocol, or dissable "Match URL" input in this case.
