import { useAtomValue, useSetAtom } from "jotai";
import { FieldTyp, FormIdx } from "@/store/8-manifest";
import { type FieldRowCtx, type FileUsCtx } from "@/store/2-file-mani-atoms";
import { Column6_Policy } from "./1-col6-policy";
import { Column6_LinkToLoginForm } from "./2-col6-link2login";

export function Column6_PolicySelector({ rowCtx, fileUsCtx }: { rowCtx: FieldRowCtx; fileUsCtx: FileUsCtx; }) {
    const isPasswordRow = useAtomValue(rowCtx.typeAtom) === FieldTyp.psw;
    const setUseIt = useSetAtom(rowCtx.useItAtom);
    const enableRow = () => setUseIt(true);

    if (!isPasswordRow) {
        return <div />;
    }

    return (<>
        {fileUsCtx.formIdx === FormIdx.login
            ? <Column6_Policy rowCtx={rowCtx} onClick={enableRow} />
            : <Column6_LinkToLoginForm rowCtx={rowCtx} fileUsCtx={fileUsCtx} />
        }
    </>);
}
