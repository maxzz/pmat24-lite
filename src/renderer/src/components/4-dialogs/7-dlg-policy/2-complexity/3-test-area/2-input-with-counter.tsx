import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { PolicyDlgConv, verifyAtom } from "../../0-all";
import { Input } from "@/ui";
import { classNames, turnOffAutoComplete } from "@/utils";

const localInputClasses = "h-8 text-mani-foreground bg-mani-background border-mani-border-muted";

export function InputWithCounter({ dlgUiAtoms }: { dlgUiAtoms: PolicyDlgConv.PolicyUiAtoms; }) {
    const [testPassword, setTestPassword] = useAtom(dlgUiAtoms.testPasswordAtom);
    const testVerified = useAtomValue(dlgUiAtoms.testVerifiedAtom);
    const doVerify = useSetAtom(verifyAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        console.log('onChange', value);

        doVerify({ dlgUiAtoms, psw: value, prevPsw: '' });
        setTestPassword(value);
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

                    <div>
                        {testPassword.length}
                    </div>
                </div>
            )}
        </div>
    );
}
