import { type OFormContextProps } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";
import { ExtPolicySelect } from "../9-controls/4-ext-policies/1-input-select";

export function Part3Authentication({ ctx }: { ctx: OFormContextProps; }) {

    const { aimAtom, lockAtom, auth_plAtom } = ctx.oFormAtoms.options.p3Auth;

    return (<>
        <RowInputWTitle stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <RowInputWTitle stateAtom={lockAtom} label="Lock out login fields" asCheckbox />

        <ExtPolicySelect stateAtom={auth_plAtom} />
    </>);
}
