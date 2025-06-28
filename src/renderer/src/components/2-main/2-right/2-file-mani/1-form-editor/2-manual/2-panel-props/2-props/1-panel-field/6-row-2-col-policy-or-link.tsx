import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type NormalField, type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel, InputSelectUi } from "../8-props-ui";
import { buildLoginDropdownFieldsAtom } from "./8-form-field-atoms";
import { classNames } from "@/utils";

export function Case_ManualFieldPolicyBtn({ rowCtx }: { rowCtx: NormalField.RowCtx; }) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;
    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
        />
    );
}

export function Case_LinkToLoginForm({ rowCtx, fileUsCtx }: { rowCtx: NormalField.RowCtx; fileUsCtx: FileUsCtx; }) {
    const { rfieldUuidAtom } = rowCtx;
    const [rindexUuid, setRindexUuid] = useAtom(rfieldUuidAtom);

    const doBuildDropdownFields = useSetAtom(buildLoginDropdownFieldsAtom);
    const dropdownAllItems = doBuildDropdownFields(rowCtx, fileUsCtx);

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
