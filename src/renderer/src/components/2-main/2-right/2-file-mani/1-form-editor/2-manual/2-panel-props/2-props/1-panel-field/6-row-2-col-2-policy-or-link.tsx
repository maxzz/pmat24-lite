import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, buildLoginDropdownFieldsAtom, getAllFormsFields_byFileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputSelectUi } from "../8-props-ui";
import { classNames } from "@/utils";

export function Case_ManualFieldPolicyBtn({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;
    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
        />
    );
}

export function Case_LinkToLoginForm({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { rfieldUuidAtom } = rowCtx;
    const rindexUuid = useAtomValue(rfieldUuidAtom);
    const setRefUuid = useSetAtom(onSetRefUuidAtom);
    const dropdownAllItems = useSetAtom(buildLoginDropdownFieldsAtom)(rowCtx, fileUsCtx);

    function onValueChange(value: string) {
        setRefUuid(rowCtx, value, fileUsCtx);
    }

    return (
        <InputSelectUi
            triggerClasses={classNames("w-full", `${rindexUuid}` === '0' && inputAsRefClasses)}
            items={dropdownAllItems}
            value={`${rindexUuid}`}
            onValueChange={onValueChange}
        />
    );
}

const inputAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-pointer";

export const onSetRefUuidAtom = atom(
    null,
    (get, set, rowCtx: FieldRowCtx, value: string, fileUsCtx: FileUsCtx) => {
        const newValue = +value;
        const { rfieldAtom, rfieldUuidAtom } = rowCtx;
        const rindexUuid = get(rfieldUuidAtom);
        const rfield = get(rfieldAtom);

        const thisUuid = rowCtx.metaField.uuid;

        const cpassFields = getAllFormsFields_byFileUsCtx(fileUsCtx, get).cpass;
        const cpassPasswords = cpassFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        const thisIdx = cpassPasswords.findIndex((field) => field.metaField.uuid === thisUuid);

        if (newValue !== 0 && thisIdx !== -1) {
            if (thisIdx !== 0) {
                set(rfieldAtom, 'out');
            }
        }

        set(rfieldUuidAtom, newValue);
    }
);
