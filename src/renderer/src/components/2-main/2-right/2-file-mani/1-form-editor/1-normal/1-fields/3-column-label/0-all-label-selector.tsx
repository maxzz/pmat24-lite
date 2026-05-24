import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "@/store/8-manifest";
import { type FieldRowCtx, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { Case_ValueMatchedText } from "../4-column-value-selector/3-col-match-text";
import { Column3_Label } from "../..";

export function Column3_LabelSelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom } = rowCtx;

    const isTypeTxt = useAtomValue(typeAtom) === FieldTyp.text;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    return (<>
        {isTypeTxt ? (
            <Case_ValueMatchedText rowCtx={rowCtx} />
        ) : (
            <Column3_Label
                useItAtom={useItAtom}
                valueAtom={labelAtom}
                typeAtom={typeAtom}
                highlightCtx={{ nFieldCtx: rowCtx, fileUs: fileUsCtx.fileUs, formIdx: fileUsCtx.formIdx }}
                onClick={enableRow}
            />
        )}
    </>);
}
