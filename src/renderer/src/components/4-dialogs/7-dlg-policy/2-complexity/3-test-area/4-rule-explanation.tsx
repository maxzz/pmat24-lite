import { Fragment, HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { type PolicyDlgTypes } from "../../0-all";
import { SymbolDot } from "@/ui/icons";
import { classNames } from "@/utils";

export function ErrorInfo({ errorText, className, ...rest }: { errorText: string; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("mt-1 min-h-4 text-red-500 select-text", !errorText && "invisible", className)} {...rest}>
            {errorText}
        </div>
    );
}

export function RuleExplanation({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const explanation = useAtomValue(dlgUiCtx.explanationAtom);
    const errorText = useAtomValue(dlgUiCtx.errorTextAtom);
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

            <ErrorInfo className="font-semibold" errorText={errorText} />
        </div>
    );
}
