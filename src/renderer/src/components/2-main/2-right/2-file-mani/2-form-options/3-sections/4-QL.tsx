import { type OptionsState } from "@/store/1-atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUrlAtom } = atoms.p4QL;

    return (<>
        <RowInputWTitle stateAtom={qNameAtom} label="Name displayed on the mini-dashboard" />
        <RowInputWTitle stateAtom={qUrlAtom} label="Quick Link URL" />

        {/* No need to show checkbox. We can update checkbox by content of mini-dashboard name */}
        {/* <RowInputWTitle stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox /> */}
    </>);
}
