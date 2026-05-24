import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp } from "@/store/8-manifest";
import { useIsLinkedToLogin, type FieldRowCtx, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { Column4_Value } from "./1-0-col-normal-value";
import { Case_ValueForLinked } from "./2-col-value-linked";
import { Case_ValueMatchedText } from "./3-col-match-text";

export function Column4_ValueSelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, policiesAtom, metaField } = rowCtx;

    const isTypeTxt = useAtomValue(typeAtom) === FieldTyp.text;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    const isLinked = useIsLinkedToLogin(rowCtx, fileUsCtx);

    const maniField = metaField.mani;

    if (isTypeTxt) {
        return <Case_ValueMatchedText rowCtx={rowCtx} />;
    }

    return (<>
        {isLinked
            ? (
                <Case_ValueForLinked rowCtx={rowCtx} />
            )
            : (
                <Column4_Value
                    useItAtom={useItAtom}
                    valueLifeAtom={valueLifeAtom}
                    choosevalue={maniField.choosevalue}
                    onClick={enableRow}
                />
            )
        }
    </>);
}
