import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { type OptionTextValue } from "@/store/manifest";
import { useIsLinkedToLogin, type FieldRowCtx, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Column4_Value } from "./1-normal-value";
import { InputSelectUi } from "../../../2-manual/2-panel-props/2-props/8-props-ui";

export function Column4_ValueSelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, policiesAtom, metaField } = rowCtx;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    const isLinked = useIsLinkedToLogin(rowCtx, fileUsCtx);

    const maniField = metaField.mani;
    return (<>
        {isLinked
            ? (
                <Case_ValueForCpassPsw rowCtx={rowCtx} />
            )
            : (
                <Column4_Value
                    useItAtom={useItAtom}
                    valueLifeAtom={valueLifeAtom}
                    choosevalue={maniField.choosevalue}
                    onClick={enableRow}
                />
            )
        }
    </>);
}

function Case_ValueForCpassPsw({ rowCtx }: { rowCtx: FieldRowCtx; }) {
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
