import { useAtomValue } from "jotai";
import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { RowInputWLabel } from "../9-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, dashboardAtom } = atoms.p4QL;

    return (<>
        <RowInputWLabel stateAtom={qNameAtom} label="Quick Link URL" />

        <RowInputWLabel stateAtom={dashboardAtom} label="Display on mini-dashboard" asCheckbox />
        <DashboardOption atoms={atoms} />
    </>);
}

function DashboardOption({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { dashboardAtom, qUrlAtom } = atoms.p4QL;

    const dashboard = useAtomValue(dashboardAtom);

    return (<>
        {dashboard && (<>
            <RowInputWLabel stateAtom={qUrlAtom} label="Quick Link Name" />
        </>)}
    </>);
}
