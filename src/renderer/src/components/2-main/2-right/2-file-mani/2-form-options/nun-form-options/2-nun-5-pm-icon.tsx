import { OptionsState } from "@/store/2-file-mani-atoms/3-options";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block5_PMIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    // const { idAtom, locAtom } = atoms.p5Icon; // obsolete,now we use quadrandAtom, xAtom, yAtom

    return (<>
        {/* <InputWithTitle2Cols stateAtom={idAtom} label="Location ID" />
        <InputWithTitle2Cols stateAtom={locAtom} label="Location" /> */}
    </>);
}
