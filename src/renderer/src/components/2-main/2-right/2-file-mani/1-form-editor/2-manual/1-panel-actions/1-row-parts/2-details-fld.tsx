import type { ManualFieldState } from "@/store/atoms/3-file-mani-atoms";
import { useAtomValue } from "jotai";
import { FieldTyp } from "pm-manifest";
import { detailKbdClasses } from "./1-details-key";
import { classNames } from "@/utils";

function FieldName({ item }: { item: ManualFieldState.FldForAtoms; }) {
    const name = useAtomValue(item.field.labelAtom) || 'Field';
    return (
        <div className="hidden @[300px]/actions:flex items-center justify-between">
            {name}
        </div>
    );
}

export function DetailsFld({ item }: { item: ManualFieldState.FldForAtoms; }) {
    const type = useAtomValue(item.field.typeAtom) === FieldTyp.psw ? 'Password' : 'Text';
    return (
        <div className="hidden @[300px]/actions:flex items-center justify-between">
            <FieldName item={item} />

            <span className={classNames(detailKbdClasses, "font-normal")}>
                {type}
            </span>
        </div>
    );
}
