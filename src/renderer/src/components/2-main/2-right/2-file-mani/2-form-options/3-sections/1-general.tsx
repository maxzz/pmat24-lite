import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (<>
        <RowInputWTitle stateAtom={descAtom} label="Description" />
        <RowInputWTitle stateAtom={hintAtom} label="User hint" />
        <RowInputWTitle stateAtom={balloonAtom} label="Show balloon" />
    </>);
}
