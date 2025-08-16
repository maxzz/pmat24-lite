import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FieldTyp } from "@/store/manifest";
import { type MFormProps, type ManualFieldState, useIsLinkedToLogin } from "@/store/2-file-mani-atoms";
import { detailKbdClasses } from "./8-classes";

export function DetailsFld({ item, mFormProps }: { item: ManualFieldState.CtxFld; mFormProps: MFormProps; }) {
    const isLinked = useIsLinkedToLogin(item.rowCtx, mFormProps.mFormCtx.fileUsCtx);
    const thisIsPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;

    const text =
        thisIsPsw
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
