import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWTitle } from "../9-controls";

export function Part5PasswordManagerIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { idAtom, locAtom } = atoms.p5Icon;

    return (<>
        <RowInputWTitle stateAtom={idAtom} label="Location ID" />
        <RowInputWTitle stateAtom={locAtom} label="Location" />
    </>);
}
