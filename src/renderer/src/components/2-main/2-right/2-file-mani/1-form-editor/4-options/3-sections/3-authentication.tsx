import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part3Authentication({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { aimAtom, lockAtom } = atoms.uiPart3Authentication;

    return (<>
        <RowInputWLabel stateAtom={aimAtom} label="Authenticate immediately" />
        <RowInputWLabel stateAtom={lockAtom} label="Lock out login fields" />
    </>);
}
