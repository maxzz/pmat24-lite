import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";
import { PolicyDlgConv, generateAtom, verifyAtom } from "../../0-all";
import { Button, Input } from "@/ui";
import { RuleExplanation } from "./2-rule-explanation";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";
const localButtonClasses = "min-w-20 active:scale-[.97]";

function InputWithCounter({ valueAtom }: { valueAtom: PrimitiveAtom<string>; }) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <div className="relative w-full">
            <Input className={localInputClasses} value={value} onChange={(e) => setValue(e.target.value)} />

            {/* TODO: show result of verify */}

            {value && (
                <div className="absolute right-2 top-0.5">
                    {value.length}
                </div>
            )}
        </div>
    );
}

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const { textGenerateAtom, textVerifyAtom } = dlgUiAtoms;

    const doGenerate = useSetAtom(generateAtom);
    const doVerify = useSetAtom(verifyAtom);

    const [generateText, setGenerateText] = useAtom(textGenerateAtom);
    const [verifyText, setVerifyText] = useAtom(textVerifyAtom);

    return (
        <div className="relative mt-4 px-4 py-3 border-border border rounded flex flex-col gap-y-2">

            <div className="absolute left-0 -top-[9px] font-semibold">
                Test area
            </div>

            <RuleExplanation dlgUiAtoms={dlgUiAtoms} />

            <div className="h-8 flex items-center space-x-2">
                <InputWithCounter valueAtom={textGenerateAtom} />
                {/* <div className="relative w-full">
                    <Input
                        className={localInputClasses}
                        value={generateText}
                        onChange={(e) => setGenerateText(e.target.value)}
                    />

                    {generateText && (
                        <div className="absolute right-2 top-0.5">{generateText.length}</div>
                    )}
                </div> */}

                <Button className={localButtonClasses} variant="outline" size="sm" tabIndex={-1} title="Generate password"
                    onClick={() => {
                        doGenerate({ dlgUiAtoms, prevPsw: '' });
                    }}>
                    Generate
                </Button>
            </div>

            <div className="h-8 flex items-center space-x-2">
                <InputWithCounter valueAtom={textVerifyAtom} />
                {/* <div className="relative w-full">
                    <Input
                        className={localInputClasses}
                        value={verifyText}
                        onChange={(e) => setVerifyText(e.target.value)}
                    />
                    {verifyText && (
                        <div className="absolute right-2 top-0.5">{verifyText.length}</div>
                    )}
                </div> */}

                <Button className={localButtonClasses} variant="outline" size="sm" tabIndex={-1} title="Validate password"
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
