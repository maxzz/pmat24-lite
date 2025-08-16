import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FieldRowCtx, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { Column6_Policy } from "./1-col-policy";
import { Case_LinkToLoginForm } from "./7-col-link-to-cpass";

export function Column6_PolicySelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const isPasswordRow = useAtomValue(rowCtx.typeAtom) === FieldTyp.psw;
    const setUseIt = useSetAtom(rowCtx.useItAtom);
    const enableRow = () => setUseIt(true);

    return (<>
        {isPasswordRow
            ? (
                fileUsCtx.formIdx === FormIdx.login
                    ? (
                        <Column6_Policy rowCtx={rowCtx} onClick={enableRow} />
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
