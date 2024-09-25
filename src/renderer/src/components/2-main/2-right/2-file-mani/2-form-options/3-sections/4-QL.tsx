import { useAtomValue } from "jotai";
import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "../9-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUseAtom } = atoms.p4QL;

    return (<>
        <DashboardOption atoms={atoms} />
        <RowInputWLabel stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox />
        <RowInputWLabel stateAtom={qNameAtom} label="Name displayed on the mini-dashboard" />

    </>);
}

function DashboardOption({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qUseAtom, qUrlAtom } = atoms.p4QL;

    const dashboard = useAtomValue(qUseAtom);

    return (<>
        {dashboard && (<>
            <RowInputWLabel stateAtom={qUrlAtom} label="Quick Link URL" />
        </>)}
    </>);
}
