import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { PolicyDlgConv } from "../../0-all";
import { SymbolDot } from "@/ui/icons";
import { classNames } from "@/utils";

export function ErrorInfo({ errorText }: { errorText: string; }) {
    return (
        <div className={classNames("mt-1 font-semibold text-red-500", !errorText && "invisible" )}>
            Invalid rule: {' '} {errorText}
        </div>
    );
}

export function RuleExplanation({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const explanation = useAtomValue(dlgUiAtoms.explanationAtom);
    const errorText = useAtomValue(dlgUiAtoms.errorTextAtom);
    return (
        <div className="mt-2">
            {explanation && (<>
                <div>
                    Password should consist of
                </div>
                
                <div className="grid grid-cols-[auto,1fr]">
                    {/*
                        Explanation:
                            Password should consist of
                            at least 8 characters,
                            including at least one uppercase letter,
                            one lowercase letter,
                            one number,
                            and one special character.
                    */}

                    {explanation.split('\n').filter(Boolean).map((line, idx) => (
                        <Fragment key={idx}>
                            <div className="pl-4 pr-1">
                                <SymbolDot className="size-3" />
                            </div>

                            <div className="text-xs" key={idx}>
                                {line}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </>)}

            <ErrorInfo errorText={errorText} />
        </div>
    );
}
