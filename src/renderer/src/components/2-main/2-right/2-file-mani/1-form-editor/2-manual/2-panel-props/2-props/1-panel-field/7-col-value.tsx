import { useAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { type FieldRowCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { InputSelectUi } from "@/ui";

export function Case_ValueForCpassPsw({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const [rfield, setRfield] = useAtom(rowCtx.rfieldAtom);
    return (
        <InputSelectUi
            triggerClasses={inputAsRefClasses}
            items={inputTypes}
            value={rfield}
            onValueChange={setRfield}
        />
    );
}

const inputTypes: OptionTextValue[] = [
    ["Current password", "in"], // old password
    ["New passowrd", "out"], // new password
    //["Confirm new passowrd", "out"], // new password //TODO: confirm new password, so far two new passwords are the same
];

const inputAsRefClasses = "w-full text-[0.6rem] !text-blue-400 cursor-pointer";

// rfield: string;                 // 'in' | 'out': in(old psw) - from login form field value, out(new psw) - to login form field value
// rfieldIndex: number;            // Index to password field in login from cpass, like '2'
