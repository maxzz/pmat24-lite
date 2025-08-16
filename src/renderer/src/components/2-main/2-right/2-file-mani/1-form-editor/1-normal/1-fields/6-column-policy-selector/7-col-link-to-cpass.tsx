import { atom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { FieldTyp } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx, buildLoginFieldsDropdownAtom, getAllFormsFields_byFileUsCtx } from "@/store/1-file-mani-atoms";
import { InputSelectUi } from "@/ui";

export function Case_LinkToLoginForm({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { rfieldUuidAtom } = rowCtx;
    const rindexUuid = useAtomValue(rfieldUuidAtom);
    const setRefUuid = useSetAtom(onSetRefUuidAtom);
    const dropdownAllItems = useSetAtom(buildLoginFieldsDropdownAtom)(rowCtx, fileUsCtx);

    function onValueChange(value: string) {
        setRefUuid(rowCtx, value, fileUsCtx);
    }

    return (
        <InputSelectUi
            triggerClasses={classNames("w-24", `${rindexUuid}` === '0' && inputAsRefClasses)}
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
        const { rfieldAtom, rfieldUuidAtom } = rowCtx;
        const newValue = +value;

        if (newValue) {
            const thisIdx = getInPswFormFieldIdx(rowCtx.metaField.uuid, fileUsCtx, { get });
            if (thisIdx !== -1) {
                set(rfieldAtom, thisIdx === 0 ? 'in' : 'out');
            }
        }

        set(rfieldUuidAtom, newValue);
    }
);

function getInPswFormFieldIdx(uuid: number, fileUsCtx: FileUsCtx, getOnly: GetOnly) {
    const cpassFields = getAllFormsFields_byFileUsCtx(fileUsCtx, getOnly).cpass;
    const cpassPasswords = cpassFields.filter((field) => getOnly.get(field.typeAtom) === FieldTyp.psw);
    const thisIdx = cpassPasswords.findIndex((field) => field.metaField.uuid === uuid);
    return thisIdx;
}
