import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    
    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
        <RowInputWLabel stateAtom={descAtom} label="Description" />
        <RowInputWLabel stateAtom={hintAtom} label="User hint" />
        <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
    </>);
}

//TODO: add validation
