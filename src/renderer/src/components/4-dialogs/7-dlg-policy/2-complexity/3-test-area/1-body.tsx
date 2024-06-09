import { Fragment } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { PolicyDlgConv, generateAtom, verifyAtom } from "../../0-all";
import { Button, Input } from "@/ui";
import { SymbolDot } from "@/ui/icons";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

function RuleExplanation({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const explanation = useAtomValue(dlgUiAtoms.explanationAtom);
    const errorText = useAtomValue(dlgUiAtoms.errorTextAtom);
    return (<>
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
                </>)}

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
    </>);
}

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const { } = dlgUiAtoms;
    const doGenerate = useSetAtom(generateAtom);
    const doVerify = useSetAtom(verifyAtom);
    const [generateText, setGenerateText] = useAtom(dlgUiAtoms.textGenerateAtom);
    const [verifyText, setVerifyText] = useAtom(dlgUiAtoms.textVerifyAtom);
    return (
        <div className="relative mt-4 px-4 py-3 border-border border rounded flex flex-col gap-y-2">

            <div className="absolute left-0 -top-[9px] font-semibold">
                Test area
            </div>

            <RuleExplanation dlgUiAtoms={dlgUiAtoms} />

            <div className="h-8 flex items-center space-x-2">
                <Input className={localInputClasses} value={generateText} onChange={(e) => setGenerateText(e.target.value)}/>

                <Button className="min-w-20" variant="outline" size="sm" tabIndex={-1} title="Generate password"
                    onClick={() => {
                        doGenerate({ dlgUiAtoms, prevPsw: '' });
                    }}>
                    Generate
                </Button>
            </div>

            <div className="h-8 flex items-center space-x-2">
                <Input className={localInputClasses} value={verifyText} onChange={(e) => setVerifyText(e.target.value)}/>

                <Button className="min-w-20" variant="outline" size="sm" tabIndex={-1} title="Validate password"
                    onClick={() => {
                        doVerify({ dlgUiAtoms, psw: verifyText, prevPsw: '' });
                    }}
                >
                    Verify
                </Button>
            </div>
        </div>
    );
}
