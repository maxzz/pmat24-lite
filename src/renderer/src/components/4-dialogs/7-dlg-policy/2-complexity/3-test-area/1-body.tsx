import { Button, Input, TextareaAutoGrow } from "@/ui";
import { PolicyDlgConv } from "../../0-all/0-conv";
import { Fragment, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { SymbolDot } from "@/ui/icons";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const explanation = useAtomValue(dlgUiAtoms.explanationAtom);
    return (
        <div className="relative mt-4 px-4 py-3 border-border border rounded flex flex-col gap-y-2">

            <div className="absolute left-0 -top-[9px] font-semibold">
                Test area
            </div>

            {explanation && (
                <div className="mb-1">
                    <div>
                        Explanation:
                    </div>
                    <div className="grid grid-cols-[auto,1fr]">
                        {/*
                            Password should consist of 
                            at least 8 characters, 
                            including at least one uppercase letter, 
                            one lowercase letter, 
                            one number, 
                            and one special character.
                        */}
                        {explanation.split('\n').filter(Boolean).map((line, idx) => (
                            <Fragment key={idx}>
                                <div className="pl-4 pr-1"><SymbolDot className="size-3" /></div>

                                <div className="text-xs" key={idx}>
                                    {line}
                                </div>
                            </Fragment>

                        ))}
                        {/* {explanation} */}
                    </div>
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
