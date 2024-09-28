import { useAtomValue } from "jotai";
import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWTitle } from "../9-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUseAtom } = atoms.p4QL;

    return (<>
        <DashboardOption atoms={atoms} />
        <RowInputWTitle stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox />
        <RowInputWTitle stateAtom={qNameAtom} label="Name displayed on the mini-dashboard" />

    </>);
}

function DashboardOption({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qUseAtom, qUrlAtom } = atoms.p4QL;

    const dashboard = useAtomValue(qUseAtom);

    return (<>
        {dashboard && (<>
            <RowInputWTitle stateAtom={qUrlAtom} label="Quick Link URL" />
        </>)}
    </>);
}
