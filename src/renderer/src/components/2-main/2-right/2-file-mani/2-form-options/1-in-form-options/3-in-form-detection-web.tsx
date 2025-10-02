import { useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { toast } from "sonner";
import { Matching } from "@/store/manifest";
import { SymbolLockClosed, SymbolLockOpen } from "@/ui/icons";
import { type OFormProps } from "@/store/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { InputWithTitle2Rows } from "@/ui/local-ui";
import { useIsShowExample } from "./5-9-set-atoms";
import { MatchHow } from "./5-2-match-how";

export function DetectionContent_Web({ oFormProps }: { oFormProps: OFormProps; }) {
    const formIdx = oFormProps.oAllAtoms.options.formIdx;
    const { p2Detect: { ourlAtom, rurlAtom }, howAtom } = oFormProps.oAllAtoms.options;
    const how = useAtomValue(howAtom);

    const showExample = useIsShowExample(oFormProps.oAllAtoms.options);
    const disabled = how === Matching.How.undef;

    const [isLocked, setIsLocked] = useState(true);

    function onLockClick() {
        setIsLocked(!isLocked);
    }

    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            <div className={textClasses}>
                <InputWithTitle2Rows
                    label={(
                        <div className="flex items-center gap-0.5">
                            Original URL of the website
                            <div className="size-2.5 cursor-pointer" onClick={onLockClick}>
                                {isLocked
                                    ? <SymbolLockClosed className="size-full" title="This setting is read-only. Only change it if you understand what you're doing." />
                                    : <SymbolLockOpen className="size-full" title="This input can be edited. Please proceed with caution." />
                                }
                            </div>

                        </div>
                    )}
                    labelClasses="font-normal"
                    stateAtom={ourlAtom}
                    asTextarea
                    readOnly={isLocked}
                    onBlur={() => setIsLocked(true)}
                />

                <div className="mt-4">How to match URL:</div>
                <MatchHow oFormProps={oFormProps} />

                <InputWithTitle2Rows
                    label="Match URL"
                    className={classNames(disabled && 'opacity-50 cursor-default')}
                    stateAtom={rurlAtom}
                    readOnly={disabled}
                    asTextarea
                    onClick={() => disabled && toast.info('This input is disabled because "How to match URL" is set "As original URL".')}
                />

                {showExample && (<>
                    <div className="mt-1">
                        Now the match URL is a regular expression and equal to the original URL.
                        It is recommended to specify the match URL as a part of original URL.
                    </div>

                    <div className="mt-1">
                        For example:
                        for <span className={exampleClasses}>https://login.example.com</span> the match URL as regular expression can be: <span className={exampleClasses}>login</span>.
                        That will not be match <span className={exampleClasses}>https://admin.example.com/login</span>.
                    </div>
                </>)}

            </div>
        </AccordionWithTrigger>
    );
}

const textClasses = "pl-6 pr-0.5";
const exampleClasses = "text-blue-500";

//TODO: Since we allow to modify original URL in Match URL field, we should should rename "As original URL" to "Match exact string" that includes the original URL domain and protocol, or dissable "Match URL" input in this case.
