import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../9-controls";

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (<>
        <RowInputWLabel stateAtom={descAtom} label="Description" />
        <RowInputWLabel stateAtom={hintAtom} label="User hint" />
        <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
    </>);
}
