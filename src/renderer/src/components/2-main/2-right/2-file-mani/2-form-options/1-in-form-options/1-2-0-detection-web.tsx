import { useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { IconClose, IconPaste, SymbolLockClosed, SymbolLockOpen } from "@/ui/icons";
import { notice } from "@/ui/local-ui/7-toaster";
import { FormRowChildren, InputWithTitle2Rows } from "@/ui/local-ui";
import { optionsTooltips } from "../8-tooltips";
import { Matching } from "@/store/8-manifest";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { MatchHow } from "./1-2-1-match-how";
import { InlineRegexHelp } from "./1-2-3-inline-regex-help";
import { BtnCopyOurl } from "./1-2-8-btn-copy-ourl";
import { ShowWarningExplanation, useNeedWarning } from "./1-2-4-use-need-warning";
import { Button } from "@/ui/shadcn/button";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {

    const { p2Detect: { ourlAtom }, murl_howAtom, murl_regexAtom } = oFormProps.oAllAtoms.options;
    const [isLocked, setIsLocked] = useState(true);
    const needWarning = useNeedWarning(oFormProps.oAllAtoms.options);

    const murl_how = +useAtomValue(murl_howAtom).data;
    const disabled = murl_how === Matching.How.undef;
    const showRegex = murl_how === Matching.How.regex;

    function clearQuickLinkUrl() {
        // setQUrl((v) => ({ ...v, data: '' }));
    }

    function pasteOriginalUrl() {
        // setQUrl((v) => ({ ...v, data: ourl.data }));
    }

    return (<>
        <div className="relative">
            <InputWithTitle2Rows
                asTextarea
                stateAtom={ourlAtom}
                className={classNames(isLocked ? 'opacity-75 cursor-default' : '')}
                label={
                    <div className="flex items-center gap-0.5">
                        Original URL of the website
                        <div className="ml-0.5 size-2.5 cursor-pointer" onClick={() => setIsLocked(!isLocked)}>
                            {isLocked
                                ? <SymbolLockClosed className="size-full" title="This setting is read-only. Only change it if you understand what you're doing." />
                                : <SymbolLockOpen className="size-full" title="This input can be edited. Please proceed with caution." />
                            }
                        </div>

                    </div>
                }
                labelClasses="font-normal"
                readOnly={isLocked}
                onClick={() => isLocked && notice.info(<span>This input field is locked by default. You can change this by using the <SymbolLockClosed className="inline-block pb-0.5 size-3.5" /> icon to unlock it — but only if you understand what you are doing.</span>)} //onClick={test_Notifications}
                onBlur={() => setIsLocked(true)}
            />
            <BtnCopyOurl ourlAtom={ourlAtom} />
        </div>

        <FormRowChildren label="Match the website URL" titleTooltip={optionsTooltips.matchUrl} className="mt-2 flex items-center gap-1">
            <MatchHow oFormProps={oFormProps} />
        </FormRowChildren>

        <AnimatePresence initial={false}>
            {showRegex && (
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 300, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto', transition: { duration: .3, ease: "easeInOut", delay: .1 } }}
                    exit={{ opacity: 0, height: 0, transition: { duration: .4, ease: "easeInOut" } }}
                >
                    <div className="absolute right-2 top-7 text-foreground/75">
                        <InlineRegexHelp />

                        {/* <div className="absolute bottom-1 right-1.5 flex items-center 1gap-px">
                            <Button className="size-5" size="icon" variant="ghost" onClick={clearQuickLinkUrl} title="Clear quick link URL">
                                <IconClose className="pt-0.5 size-4" />
                            </Button>

                            <Button className="size-5" size="icon" variant="ghost" onClick={pasteOriginalUrl} title="Paste original URL">
                                <IconPaste className="pt-0.5 size-4" />
                            </Button>
                        </div> */}

                    </div>

                    <InputWithTitle2Rows
                        asTextarea
                        stateAtom={murl_regexAtom}
                        label={showRegex ? "Regular expression" : "Original URL"}
                        labelClasses="font-normal"
                        className={classNames(disabled && 'opacity-50 cursor-default')}
                    />

                    <ShowWarningExplanation murl_regexAtom={murl_regexAtom} needWarning={needWarning} />
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}

const textClasses = "pl-6 pr-0.5 py-1";

function test_Notifications() {
    notice.error("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
    notice.warning("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
    notice.success("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
    notice.info("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
    //notice("This input is locked by default. Only change it if you understand what you're doing.", { duration: 270001 });
}

//TODO: Since we allow to modify original URL in Match URL field, we should should rename "As original URL" to "Match exact string" that includes the original URL domain and protocol, or dissable "Match URL" input in this case.
