import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "../9-controls";

export function Part3Authentication({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { aimAtom, lockAtom, auth_plAtom } = atoms.p3Auth;

    return (<>
        <RowInputWLabel stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <RowInputWLabel stateAtom={lockAtom} label="Lock out login fields" asCheckbox />

        <RowInputWLabel stateAtom={auth_plAtom} label="Extended Authentication policy" />
    </>);
}
