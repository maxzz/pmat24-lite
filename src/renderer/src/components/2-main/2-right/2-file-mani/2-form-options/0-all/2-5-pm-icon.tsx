import { OptionsState } from "@/store/1-atoms/2-file-mani-atoms/3-options";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block5_PMIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { idAtom, locAtom } = atoms.p5Icon;

    return (<>
        <InputWithTitle2Cols stateAtom={idAtom} label="Location ID" />
        <InputWithTitle2Cols stateAtom={locAtom} label="Location" />
    </>);
}
