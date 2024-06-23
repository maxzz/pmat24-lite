import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../9-controls";
import { UiAccordion } from "../9-controls/ui-accordion";

export function Part1General0({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
        <RowInputWLabel stateAtom={descAtom} label="Description" />
        <RowInputWLabel stateAtom={hintAtom} label="User hint" />
        <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
    </>);
}

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid gap-x-2 gap-y-1";

export function Part1General1({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (
        <div className={SubSubGridClasses}>
            <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </div>
    );
}

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {
    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.p1General;
    return (
        <UiAccordion open={true}>
            <RowInputWLabel stateAtom={nameAtom} label="Managed login name" />
            <RowInputWLabel stateAtom={descAtom} label="Description" />
            <RowInputWLabel stateAtom={hintAtom} label="User hint" />
            <RowInputWLabel stateAtom={balloonAtom} label="Show balloon" />
        </UiAccordion>
    );
}

//TODO: add validation
