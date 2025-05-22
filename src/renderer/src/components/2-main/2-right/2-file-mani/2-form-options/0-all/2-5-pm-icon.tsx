import { OptionsState } from "@/store/1-atoms/2-file-mani-atoms/4-options";
import { RowInputWTitle2Cols } from "../9-controls";

export function Block5_PMIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { idAtom, locAtom } = atoms.p5Icon;

    return (<>
        <RowInputWTitle2Cols stateAtom={idAtom} label="Location ID" />
        <RowInputWTitle2Cols stateAtom={locAtom} label="Location" />
    </>);
}
