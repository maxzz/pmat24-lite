import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";
import { ExtPolicySelect } from "../9-controls/4-ext-policies/1-input-select";
import { FormIdx } from "pm-manifest";

export function Part3Authentication({ ctx }: { ctx: OFormContextProps; }) {

    const { options } = ctx.oAllAtoms;
    const { aimAtom, lockAtom, auth_plAtom } = options.p3Auth;
    const isLogin = options.formIdx === FormIdx.login;

    return (<>
        <RowInputWTitle stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <RowInputWTitle stateAtom={lockAtom} label="Lock out login fields" asCheckbox />

        {isLogin && (
            <ExtPolicySelect stateAtom={auth_plAtom} />
        )}
    </>);
}
