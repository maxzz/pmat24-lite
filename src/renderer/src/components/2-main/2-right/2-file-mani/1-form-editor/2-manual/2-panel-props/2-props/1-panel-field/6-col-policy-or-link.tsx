import { useState } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { type OptionTextValue, FieldTyp, FormIdx } from "@/store/manifest";
import { type FormFields, type FileUsCtx, type ManualFieldState, type NormalField } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel, InputSelectUi } from "../8-props-ui";
import { doGetLinksAtom } from "./8-forms-fields";
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

    const getLoginFormPswFields = useSetAtom(getLoginFormPswFieldsAtom);
    const doBuildDropdownFields = useSetAtom(buildDropdownFieldsAtom);

    const fields = getLoginFormPswFields(fileUsCtx);
    const dropdownAllItems = doBuildDropdownFields(rindexUuid, fields);

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

const inputTypes: OptionTextValue[] = [
    // ["no link", "0"],
    ["Current password", "1"], // 'in'
    ["New passowrd", "2"], // 'out'
];

const getLoginFormPswFieldsAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx) => {
        const loginFields = set(doGetLinksAtom, fileUsCtx)?.[FormIdx.login];
        if (!loginFields) {
            return;
        }

        const rv = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        return rv;
    }
);

const buildDropdownFieldsAtom = atom(
    null,
    (get, set, rindexUuid: number, fields: NormalField.RowCtx[] | undefined): OptionTextValue[] => {
        set(printFieldsAtom, rindexUuid, fields);

        const rv = (fields || []).map<OptionTextValue>((field) => ([get(field.labelAtom), get(field.dbnameAtom)]));
        rv.unshift(['No link', '0']);
        return rv;
    }
);

const printFieldsAtom = atom(
    null,
    (get, set, rindexUuid: number, fields: NormalField.RowCtx[] | undefined) => {
        if (!fields) {
            return;
        }
        const all = fields.map((field) => `label:${get(field.labelAtom)} dbid:${get(field.dbnameAtom)}`);
        console.log(`for uuid:"${rindexUuid}" login fields:`, all);
    }
);
