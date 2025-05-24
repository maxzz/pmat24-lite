import { FormIdx } from "@/store/manifest";
import { type OFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ChildrenWithLabel2Cols, InputWithTitle2Cols } from "@/ui/local-ui";
import { ExtPolicySelect} from "../9-controls";

export function Block2_Authentication({ ctx }: { ctx: OFormContextProps; }) {
    const { options } = ctx.oAllAtoms;
    const { aimAtom, lockAtom, auth_plAtom } = options.p3Auth;
    const isLogin = options.formIdx === FormIdx.login;

    return (<>
        <InputWithTitle2Cols stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <InputWithTitle2Cols stateAtom={lockAtom} label="Lock out login fields" asCheckbox />

        {isLogin && (
            <ChildrenWithLabel2Cols label="Extended authentication policy">
                <ExtPolicySelect stateAtom={auth_plAtom} />
            </ChildrenWithLabel2Cols>
        )}
    </>);
}
