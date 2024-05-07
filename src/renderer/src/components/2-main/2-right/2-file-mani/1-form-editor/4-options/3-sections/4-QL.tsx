import { useAtom, useAtomValue } from "jotai";
import { OptionsState } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowInputWLabel } from "../4-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { nameAtom, dashboardAtom } = atoms.uiPart4QL;

    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Quick Link URL" />

        <RowInputWLabel stateAtom={dashboardAtom} label="Display on mini-dashboard" />
        <DashboardOption atoms={atoms} />
    </>);
}

function DashboardOption({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { dashboardAtom, urlAtom } = atoms.uiPart4QL;

    const dashboard = useAtomValue(dashboardAtom);

    return (<>
        {dashboard && (<>
            <RowInputWLabel stateAtom={urlAtom} label="Quick Link Name" />
        </>)}
    </>);
}
