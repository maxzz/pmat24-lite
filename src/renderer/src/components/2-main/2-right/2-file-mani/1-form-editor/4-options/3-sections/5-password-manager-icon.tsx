import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part5PasswordManagerIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { idAtom, locAtom } = atoms.p5Icon;

    return (<>
        <RowInputWLabel stateAtom={idAtom} label="Location ID" />
        <RowInputWLabel stateAtom={locAtom} label="Location" />
    </>);
}
