import { FormIdx } from "@/store/manifest";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ChildrenWithLabel, ExtPolicySelect, RowInputWTitle } from "../9-controls";

export function Block2_Authentication({ ctx }: { ctx: OFormContextProps; }) {
    const { options } = ctx.oAllAtoms;
    const { aimAtom, lockAtom, auth_plAtom } = options.p3Auth;
    const isLogin = options.formIdx === FormIdx.login;

    return (<>
        <RowInputWTitle stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <RowInputWTitle stateAtom={lockAtom} label="Lock out login fields" asCheckbox />

        {isLogin && (
            <ChildrenWithLabel label="Extended authentication policy">
                <ExtPolicySelect stateAtom={auth_plAtom} />
            </ChildrenWithLabel>
        )}
    </>);
}
