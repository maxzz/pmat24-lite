import { useAtom, useAtomValue } from "jotai";
import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, dashboardAtom } = atoms.uiPart4QL;

    return (<>
        <RowInputWLabel stateAtom={qNameAtom} label="Quick Link URL" />

        <RowInputWLabel stateAtom={dashboardAtom} label="Display on mini-dashboard" asCheckbox />
        <DashboardOption atoms={atoms} />
    </>);
}

function DashboardOption({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { dashboardAtom, qUrlAtom } = atoms.uiPart4QL;

    const dashboard = useAtomValue(dashboardAtom);

    return (<>
        {dashboard && (<>
            <RowInputWLabel stateAtom={qUrlAtom} label="Quick Link Name" />
        </>)}
    </>);
}
