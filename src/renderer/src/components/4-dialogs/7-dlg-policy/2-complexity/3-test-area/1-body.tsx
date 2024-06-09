import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { PolicyDlgConv, generateAtom, verifyAtom } from "../../0-all";
import { Button, Input } from "@/ui";
import { RuleExplanation } from "./2-rule-explanation";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

function InputWithCounter({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [testPassword, setTestPassword] = useAtom(dlgUiAtoms.testPasswordAtom);
    const testVerifyResult = useAtomValue(dlgUiAtoms.testVerifyResultAtom);
    const doVerify = useSetAtom(verifyAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        console.log('onChange', value);
        
        doVerify({ dlgUiAtoms, psw: value, prevPsw: '' });
        setTestPassword(value);
    }

    return (
        <div className="relative w-full">
            <Input className={localInputClasses} value={testPassword} onChange={onChange} />

            {/* TODO: show result of verify */}

            {testPassword && (<>
                <div className="absolute right-2 top-0.5">
                    {testPassword.length}
                </div>

                <div className="absolute right-12 top-0.5">
                   {testVerifyResult}
                </div>
            </>)}
        </div>
    );
}

const localButtonClasses = "active:scale-[.97]";

function ButtonGenerate({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const doGenerate = useSetAtom(generateAtom);
    return (
        <Button className={localButtonClasses} variant="outline" size="sm" title="Generate test password"
            onClick={() => {
                doGenerate({ dlgUiAtoms, prevPsw: '' });
            }}
        >
            Generate
        </Button>
    );
}

export function TestAreaBody({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    return (
        <div className="relative mt-4 px-4 py-3 border-border border rounded flex flex-col">

            <div className="absolute left-0 -top-[9px] font-semibold">
                Test area
            </div>

            <RuleExplanation dlgUiAtoms={dlgUiAtoms} />

            <div>
                <div className="mb-1">Test password</div>
                <div className="h-8 flex items-center space-x-2">
                    <InputWithCounter dlgUiAtoms={dlgUiAtoms} />
                    <ButtonGenerate dlgUiAtoms={dlgUiAtoms} />
                </div>
            </div>
        </div>
    );
}
