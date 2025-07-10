import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { buildLoginDropdownFieldsAtom, guardedFormIdx, isLinkedToLoginAtom, type MFormProps, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { detailKbdClasses } from "./8-classes";

export function DetailsFld({ item, mFormProps }: { item: ManualFieldState.CtxFld; mFormProps: MFormProps; }) {
    // const rfieldUuid = useAtomValue(item.rowCtx.rfieldUuidAtom);
    
    // const doBuildLoginDropdownFields = useSetAtom(buildLoginDropdownFieldsAtom);
    // const dropdownAllItems = doBuildLoginDropdownFields(item.rowCtx, mFormProps.mFormCtx.fileUsCtx);
    // const rIndexUuidItem = dropdownAllItems.find(([label, uuid]) => uuid === `${rfieldUuid}`);
    
    // const isCpassForm = guardedFormIdx(mFormProps) === FormIdx.cpass;
    // const isPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    // const isLinked = isCpassForm && isPsw && !!rfieldUuid && !!rIndexUuidItem;

    const isPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    const isLinkedFn = useSetAtom(isLinkedToLoginAtom);
    const isLinked = isLinkedFn(item.rowCtx, mFormProps.mFormCtx.fileUsCtx);

    const text = isPsw
        ? isLinked
            ? 'Password (linked)'
            : 'Password'
        : 'Text';

    return (
        <div className={containerClasses}>
            <span className={classNames(detailKbdClasses, "font-normal")}>
                {text}
            </span>

            <FieldName item={item} />
        </div>
    );
}

function FieldName({ item }: { item: ManualFieldState.CtxFld; }) {
    const name = useAtomValue(item.rowCtx.labelAtom) || 'Field';
    return (
        <div className={containerClasses}>
            {name}
        </div>
    );
}

const containerClasses = "hidden @[300px]/actions:flex items-center justify-between";
