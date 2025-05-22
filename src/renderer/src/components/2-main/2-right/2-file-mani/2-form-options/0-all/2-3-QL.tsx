import { type OptionsState } from "@/store/1-atoms/2-file-mani-atoms";
import { RowInputWTitle2Cols } from "../9-controls";

export function Block3_QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUrlAtom } = atoms.p4QL;

    return (<>
        <RowInputWTitle2Cols stateAtom={qNameAtom} label="Name on the mini-dashboard" /> {/* "Name displayed on the mini-dashboard" */}
        <RowInputWTitle2Cols stateAtom={qUrlAtom} label="Quick link URL" />

        {/* No need to show checkbox. We can update checkbox by content of mini-dashboard name */}
        {/* <RowInputWTitle stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox /> */}
    </>);
}
