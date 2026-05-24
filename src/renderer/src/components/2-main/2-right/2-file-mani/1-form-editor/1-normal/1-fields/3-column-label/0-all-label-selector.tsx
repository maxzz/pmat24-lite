import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "@/store/8-manifest";
import { type FieldRowCtx, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { Column3_Label } from "./1-col3-label";
import { Case_ValueMatchedText } from "./2-col3-text";

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
