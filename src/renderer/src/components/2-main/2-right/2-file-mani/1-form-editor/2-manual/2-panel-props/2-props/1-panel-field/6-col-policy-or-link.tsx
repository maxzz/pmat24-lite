import { useAtomValue } from "jotai";
import { FieldTyp, FormIdx } from "@/store/manifest";
import { type FileUsCtx, type ManualFieldState } from "@/store/1-atoms/2-file-mani-atoms";
import { Column6_Policy } from "../../../../1-normal/1-fields/6-column-policy";
import { InputLabel } from "../8-props-ui/1-input-label";

export function PolicyOrLink({ item, fileUsCtx }: { item: ManualFieldState.CtxFld; fileUsCtx: FileUsCtx; }) {
    const { useItAtom, labelAtom, valueLifeAtom, typeAtom } = item.rowCtx;

    const isFieldPsw = useAtomValue(typeAtom) === FieldTyp.psw;
    const isFormLogin = fileUsCtx.formIdx === FormIdx.login;
    
    return (<>
        {isFieldPsw
            ? <ManualFieldPolicyBtn item={item} />
            : <LinkToLoginForm item={item} />
        }
    </>);
}

export function ManualFieldPolicyBtn({ item }: { item: ManualFieldState.CtxFld; }) {
    const { useItAtom, typeAtom, policiesAtom } = item.rowCtx;

    const isPassword = useAtomValue(typeAtom) === FieldTyp.psw;
    if (!isPassword) {
        return null;
    }

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
