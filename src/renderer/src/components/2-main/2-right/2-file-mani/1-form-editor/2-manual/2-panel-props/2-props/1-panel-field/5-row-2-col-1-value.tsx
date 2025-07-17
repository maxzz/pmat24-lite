import { type FieldRowCtx, type FileUsCtx, type ManualFieldState, useIsLinkedToLogin } from "@/store/1-atoms/2-file-mani-atoms";
import { Case_ValueForCpassPsw, Column4_Value } from "../../../../1-normal/1-fields";

export function Col_ManualFieldValue({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { rowCtx } = item;
    const isLinked = useIsLinkedToLogin(rowCtx, fileUsCtx);
    return (<>
        {isLinked
            ? <Case_ValueForCpassPsw rowCtx={rowCtx} />
            : <Case_ValueForLoginAndNotPsw rowCtx={rowCtx} />
        }
    </>);
}

function Case_ValueForLoginAndNotPsw({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, valueLifeAtom } = rowCtx;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
        />
    );
}
