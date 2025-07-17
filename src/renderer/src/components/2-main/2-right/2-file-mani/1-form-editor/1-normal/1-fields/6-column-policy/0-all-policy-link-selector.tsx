import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { Case_LinkToLoginForm } from "../../../2-manual/2-panel-props/2-props/1-panel-field/7-col-link-to-cpass";
import { Column6_Policy } from "./1-col-policy";

export function Column6_PolicySelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const isPasswordRow = useAtomValue(rowCtx.typeAtom) === FieldTyp.psw;
    return (<>
        {isPasswordRow
            ? (
                fileUsCtx.formIdx === FormIdx.login
                    ? (
                        <Case_NormalFieldPolicyBtn rowCtx={rowCtx} />
                    )
                    : (
                        <Case_LinkToLoginForm rowCtx={rowCtx} fileUsCtx={fileUsCtx} />
                    )
            )
            : (
                <div className="text-center" />
            )
        }
    </>);
}

function Case_NormalFieldPolicyBtn({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;

    const setUseIt = useSetAtom(useItAtom);
    const enableRow = () => setUseIt(true);

    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
            onClick={enableRow}
        />
    );
}

export function Case_ManualFieldPolicyBtn({ rowCtx }: { rowCtx: FieldRowCtx; }) {
    const { useItAtom, typeAtom, policiesAtom } = rowCtx;
    return (
        <Column6_Policy
            useItAtom={useItAtom}
            typeAtom={typeAtom}
            policiesAtom={policiesAtom}
        />
    );
}
