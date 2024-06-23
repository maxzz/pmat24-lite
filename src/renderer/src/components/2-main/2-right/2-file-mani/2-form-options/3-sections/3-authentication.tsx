import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../9-controls";

export function Part3Authentication({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { aimAtom, lockAtom } = atoms.p3Auth;

    return (<>
        <RowInputWLabel stateAtom={aimAtom} label="Authenticate immediately" asCheckbox />
        <RowInputWLabel stateAtom={lockAtom} label="Lock out login fields" asCheckbox />
    </>);
}
