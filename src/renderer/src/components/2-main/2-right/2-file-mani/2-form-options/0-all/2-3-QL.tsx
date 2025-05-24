import { type OptionsState } from "@/store/1-atoms/2-file-mani-atoms";
import { InputWithTitle2Cols } from "@/ui/local-ui";

export function Block3_QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUrlAtom } = atoms.p4QL;

    return (<>
        <InputWithTitle2Cols stateAtom={qNameAtom} label="Name on the mini-dashboard" /> {/* "Name displayed on the mini-dashboard" */}
        <InputWithTitle2Cols stateAtom={qUrlAtom} label="Quick link URL" />

        {/* No need to show checkbox. We can update checkbox by content of mini-dashboard name */}
        {/* <InputWithTitle2Cols stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox /> */}
    </>);
}
