import { useAtomValue } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel } from "../8-props-ui/1-input-label";

export function Col_PolicyOrLink({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const isFieldPsw = useAtomValue(item.rowCtx.typeAtom) === FieldTyp.psw;
    if (!isFieldPsw) {
        return null;
    }

    return (<>
        {fileUsCtx.formIdx === FormIdx.login
            ? <ManualFieldPolicyBtn item={item} />
            : <LinkToLoginForm item={item} />
        }
    </>);
}

export function ManualFieldPolicyBtn({ item }: { item: ManualFieldState.CtxFld; }) {
    const { useItAtom, typeAtom, policiesAtom } = item.rowCtx;
    return (
        <InputLabel label="Policy">
            <Column6_Policy
                useItAtom={useItAtom}
                typeAtom={typeAtom}
                policiesAtom={policiesAtom}
            />
        </InputLabel>
    );
}

function LinkToLoginForm({ item }: { item: ManualFieldState.CtxFld; }) {
    return (
        <InputLabel label="Link to login form">
            Link
        </InputLabel>
    );
}

//TODO: Policy button if field password
