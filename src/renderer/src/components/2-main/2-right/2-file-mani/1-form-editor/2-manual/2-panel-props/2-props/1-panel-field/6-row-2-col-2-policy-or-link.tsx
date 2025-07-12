import { useAtom, useSetAtom } from "jotai";
import { type FieldRowCtx, type FileUsCtx, buildLoginDropdownFieldsAtom } from "@/store/1-atoms/2-file-mani-atoms";
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
    const [rindexUuid, setRindexUuid] = useAtom(rfieldUuidAtom);
    const dropdownAllItems = useSetAtom(buildLoginDropdownFieldsAtom)(rowCtx, fileUsCtx);

    return (
        <InputSelectUi
            triggerClasses={classNames("w-full", `${rindexUuid}` === '0' && inputAsRefClasses)}
            items={dropdownAllItems}
            value={`${rindexUuid}`}
            onValueChange={(value) => setRindexUuid(+value)}
        />
    );
}

const inputAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-pointer";
