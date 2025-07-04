import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type MFormProps, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { detailKbdClasses } from "./1-details-key";

export function DetailsFld({ item, mFormProps }: { item: ManualFieldState.CtxFld; mFormProps: MFormProps; }) {
    const isPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    const rfieldUuid = useAtomValue(item.rowCtx.rfieldUuidAtom);
    const isLinked = mFormProps.mFormCtx.fileUsCtx.formIdx === FormIdx.cpass && isPsw && !!rfieldUuid;

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

//TODO: add visual feedback for linked password field in password change form