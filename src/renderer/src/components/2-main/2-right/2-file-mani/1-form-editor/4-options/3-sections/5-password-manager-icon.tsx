import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part5PasswordManagerIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { idAtom, locAtom } = atoms.uiPart5PasswordManagerIcon;

    return (<>
        <RowInputWLabel stateAtom={idAtom} label="Location ID" />
        <RowInputWLabel stateAtom={locAtom} label="Location" />
    </>);
}
