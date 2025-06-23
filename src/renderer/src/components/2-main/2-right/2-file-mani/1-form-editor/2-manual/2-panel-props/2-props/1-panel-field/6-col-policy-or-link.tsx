import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel, InputSelectUi } from "../8-props-ui";
import { doGetLinksAtom } from "./8-forms-fields";

export function Col_PolicyOrLink({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const isFieldPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    if (!isFieldPsw) {
        return null;
    }

    return (<>
        {fileUsCtx.formIdx === FormIdx.login
            ? <Case_ManualFieldPolicyBtn item={item} />
            : <Case_LinkToLoginForm item={item} fileUsCtx={fileUsCtx} />
        }
    </>);
}

export function Case_ManualFieldPolicyBtn({ item }: { item: ManualFieldState.CtxFld; }) {
    const { useItAtom, typeAtom, policiesAtom } = item.rowCtx;
    return (
        <InputLabel label="Policy">
            <Column6_Policy
                useItAtom={useItAtom}
                typeAtom={typeAtom}
                policiesAtom={policiesAtom}
            />
        </InputLabel>
    );
}

function Case_LinkToLoginForm({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const [type, setType] = useState('1');

    const { rfieldUuidAtom } = item.rowCtx;

    const rindexUuid = useAtomValue(rfieldUuidAtom);
    const label = useAtomValue(item.rowCtx.labelAtom);
    const doGetLinks = useSetAtom(doGetLinksAtom);
    console.log(`field links "${label} link: ${rindexUuid}":`, doGetLinks(fileUsCtx));

    return (
        <InputLabel label="Link to login form">
            
            <InputSelectUi
                items={inputTypes}
                value={`${type}`}
                onValueChange={(value) => setType(value)}
            />

        </InputLabel>
    );
}

const inputTypes: OptionTextValue[] = [
    // ["no link", "0"],
    ["Current password", "1"], // 'in'
    ["New passowrd", "2"], // 'out'
];
