import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type PolicyDlgTypes, doVerifyPswAtom } from "../../0-all";
import { Input } from "@/ui";
import { classNames, turnOffAutoComplete } from "@/utils";

const localInputClasses = "h-7 text-mani-foreground bg-mani-background border-mani-border-muted";

export function InputWithCounter({ dlgUiCtx }: { dlgUiCtx: PolicyDlgTypes.PolicyUiCtx; }) {
    const [testPassword, setTestPassword] = useAtom(dlgUiCtx.testPasswordAtom);
    const testVerified = useAtomValue(dlgUiCtx.testVerifiedAtom);
    const doVerify = useSetAtom(doVerifyPswAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTestPassword(value);
        doVerify({ dlgUiCtx: dlgUiCtx });
    }

    return (
        <div className="relative w-full">
            <Input className={localInputClasses} value={testPassword} onChange={onChange} {...turnOffAutoComplete} />

            {testPassword && (
                <div className="absolute right-2 top-0.5 flex items-center gap-2">

                    {testVerified && (
                        <div className={classNames(testVerified === '0' ? "text-red-500" : "text-green-500")}>
                            {testVerified === '0' ? 'Invalid' : 'Valid'}
                        </div>
                    )}

                    <div className="text-muted-foreground">
                        {testPassword.length}
                    </div>
                </div>
            )}
        </div>
    );
}
