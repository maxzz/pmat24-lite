import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../9-controls";

export function Part1General0({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
        <RowInputWLabel stateAtom={descAtom} label="Description" />
        <RowInputWLabel stateAtom={hintAtom} label="User hint" />
        <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
    </>);
}

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (
        <div className="col-span-2 grid grid-cols-subgrid gap-x-2 gap-y-1">
            <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </div>
    );
}

//TODO: add validation
