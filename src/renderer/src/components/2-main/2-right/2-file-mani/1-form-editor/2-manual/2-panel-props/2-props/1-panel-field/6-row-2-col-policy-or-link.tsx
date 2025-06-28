import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel, InputSelectUi } from "../8-props-ui";
import { buildLoginDropdownFieldsAtom } from "./8-form-field-atoms";
import { classNames } from "@/utils";

export function Case_ManualFieldPolicyBtn({ item }: { item: ManualFieldState.CtxFld; }) {
    const { useItAtom, typeAtom, policiesAtom } = item.rowCtx;
    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
        />
    );
}

export function Case_LinkToLoginForm({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const [type, setType] = useState('0');

    const { rfieldUuidAtom } = item.rowCtx;
    const [rindexUuid, setRindexUuid] = useAtom(rfieldUuidAtom);

    const doBuildDropdownFields = useSetAtom(buildLoginDropdownFieldsAtom);
    const dropdownAllItems = doBuildDropdownFields(item.rowCtx, fileUsCtx);

    // return null;

    return (
        <InputSelectUi
            triggerClasses={classNames("w-full", `${rindexUuid}` === '0' && inputAsRefClasses)}
            items={dropdownAllItems}
            value={`${rindexUuid}`}
            onValueChange={(value) => setRindexUuid(value as unknown as number)}
        />
    );
}

const inputAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-pointer";
