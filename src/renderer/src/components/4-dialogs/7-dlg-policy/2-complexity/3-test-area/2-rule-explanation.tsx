import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { PolicyDlgConv } from "../../0-all";
import { SymbolDot } from "@/ui/icons";

export function ErrorInfo({ errorText }: { errorText: string; }) {
    return (
        <div className="text-red-500">
            Rule is invalid: {' '}
            <span className="font-semibold">
                {errorText}
            </span>
        </div>
    );
}

export function RuleExplanation({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const explanation = useAtomValue(dlgUiAtoms.explanationAtom);
    const errorText = useAtomValue(dlgUiAtoms.errorTextAtom);

    if (!explanation && !errorText) {
        return null;
    }

    return (
        <div className="mb-1">
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

            {errorText && (
                <ErrorInfo errorText={errorText} />
            )}
        </div>
    );
}
