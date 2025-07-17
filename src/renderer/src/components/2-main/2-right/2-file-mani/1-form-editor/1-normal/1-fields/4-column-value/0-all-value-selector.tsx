import { useSetAtom } from "jotai";
import { useIsLinkedToLogin, type FieldRowCtx, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Column4_Value } from "./1-col-normal-value";
import { Case_ValueForCpassPsw } from "./7-col-value";

export function Column4_ValueSelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, typeAtom, labelAtom, valueLifeAtom, policiesAtom, metaField } = rowCtx;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    const isLinked = useIsLinkedToLogin(rowCtx, fileUsCtx);

    const maniField = metaField.mani;
    return (<>
        {isLinked
            ? (
                <Case_ValueForCpassPsw rowCtx={rowCtx} />
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
