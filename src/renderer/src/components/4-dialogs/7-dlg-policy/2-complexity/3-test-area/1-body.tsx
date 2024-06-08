import { Fragment } from "react";
import { useAtomValue } from "jotai";
import { PolicyDlgConv } from "../../0-all";
import { Button, Input } from "@/ui";
import { SymbolDot } from "@/ui/icons";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const explanation = useAtomValue(dlgUiAtoms.explanationAtom);
    const errorText = useAtomValue(dlgUiAtoms.errorTextAtom);
    return (
        <div className="relative mt-4 px-4 py-3 border-border border rounded flex flex-col gap-y-2">

            <div className="absolute left-0 -top-[9px] font-semibold">
                Test area
            </div>

            {(explanation || errorText) && (
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
                    </>
                    )}

                    {errorText && (
                        <div className="text-red-500">
                            Rule is invalid: {' '}
                            <span className="font-semibold">
                                {errorText}
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className="h-8 flex items-center space-x-2">
                <Input className={localInputClasses} />

                <Button className="min-w-20" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Generate
                </Button>
            </div>

            <div className="h-8 flex items-center space-x-2">
                <Input className={localInputClasses} />

                <Button className="min-w-20" variant="outline" size="sm" tabIndex={-1} title="Explanation" >
                    Verify
                </Button>
            </div>
        </div>
    );
}
