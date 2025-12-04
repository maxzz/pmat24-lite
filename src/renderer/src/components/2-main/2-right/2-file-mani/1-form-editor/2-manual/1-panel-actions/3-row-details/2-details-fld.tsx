import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FieldTyp } from "@/store/8-manifest";
import { type MFormProps, type ManualFieldState, useIsLinkedToLogin } from "@/store/2-file-mani-atoms";
import { detailKbdClasses, hideBreakpointClasses } from "./8-classes";

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
        <div className={classNames(hideBreakpointClasses, "1min-w-0")}>
            <span className={classNames(detailKbdClasses, "font-normal truncate")}>
                {text}
            </span>

            <FieldName item={item} />
        </div>
    );
}

function FieldName({ item }: { item: ManualFieldState.CtxFld; }) {
    const name = useAtomValue(item.rowCtx.labelAtom) || 'Field';
    return (
        // <div className={hideBreakpointClasses}>
        <span className={classNames("1shrink-1 1min-w-0 truncate", detailKbdClasses, "font-normal")}>
            {name.length > 30 ? name.slice(0, 20) + '...' : name}
        </span>
        // </div>
    );
}
