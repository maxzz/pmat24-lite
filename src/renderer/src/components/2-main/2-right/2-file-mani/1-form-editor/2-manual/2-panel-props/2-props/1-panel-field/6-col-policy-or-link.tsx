import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel, InputSelectUi } from "../8-props-ui";
import { buildDropdownFieldsAtom } from "./8-forms-fields";
import { classNames } from "@/utils";

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

    const { labelAtom, rfieldUuidAtom } = item.rowCtx;
    const rindexUuid = useAtomValue(rfieldUuidAtom);
    const label = useAtomValue(labelAtom);

    const doBuildDropdownFields = useSetAtom(buildDropdownFieldsAtom);
    const dropdownAllItems = doBuildDropdownFields(rindexUuid, fileUsCtx);

    return (
        <InputLabel label="Link to login form" labelClasses="pb-0.5" className="min-w-32">

            <InputSelectUi
                triggerClasses={classNames("w-full", type === '0' && inputAsRefClasses)}
                items={dropdownAllItems}
                value={`${type}`}
                onValueChange={(value) => setType(value)}
            />

        </InputLabel>
    );
}

const inputAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-pointer";
