import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FieldTyp } from "pm-manifest";
import type { ManualFieldState } from "@/store/1-atoms/3-file-mani-atoms";
import { detailKbdClasses } from "./1-details-key";

export function DetailsFld({ item }: { item: ManualFieldState.CtxFld; }) {
    const type = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw ? 'Password' : 'Text';
    return (
        <div className="hidden @[300px]/actions:flex items-center justify-between">
            <FieldName item={item} />

            <span className={classNames(detailKbdClasses, "font-normal")}>
                {type}
            </span>
        </div>
    );
}

function FieldName({ item }: { item: ManualFieldState.CtxFld; }) {
    const name = useAtomValue(item.rowCtx.labelAtom) || 'Field';
    return (
        <div className="hidden @[300px]/actions:flex items-center justify-between">
            {name}
        </div>
    );
}
