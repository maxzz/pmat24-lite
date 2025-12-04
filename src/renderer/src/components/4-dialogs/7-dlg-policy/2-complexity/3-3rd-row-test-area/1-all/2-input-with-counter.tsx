import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type PolicyDlgTypes, doVerifyPswAtom } from "../../../0-all";
import { Input } from "@/ui";
import { classNames, turnOffAutoComplete } from "@/utils";

export function InputWithCounter({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [testPassword, setTestPassword] = useAtom(dlgUiCtx.testPasswordAtom);

    const testVerified = useAtomValue(dlgUiCtx.testVerifiedAtom);
    const doVerifyPsw = useSetAtom(doVerifyPswAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTestPassword(value);
        doVerifyPsw({ dlgUiCtx: dlgUiCtx });
    }

    return (
        <div className="relative w-full">
            <Input className={localInputClasses} value={testPassword} onChange={onChange} {...turnOffAutoComplete} />

            {testPassword && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">

                    {testVerified && (
                        <div className={classNames("text-[0.65rem]", testVerified === '0' ? "text-red-500" : "text-green-500")}>
                            {testVerified === '0' ? 'Invalid' : 'Valid'}
                        </div>
                    )}

                    <div className="whitespace-pre text-[0.65rem] font-mono text-muted-foreground">
                        {`${testPassword.length}`.padStart(3, ' ')}
                    </div>
                </div>
            )}
        </div>
    );
}

const localInputClasses = "pr-16 h-7 text-xs text-mani-foreground bg-mani-background border-mani-border-muted";
