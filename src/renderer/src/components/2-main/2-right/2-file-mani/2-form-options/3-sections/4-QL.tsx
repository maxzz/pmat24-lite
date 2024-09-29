import { type OptionsState } from "@/store/atoms/3-file-mani-atoms";
import { type RowInputState } from "@/ui";
import { RowInputWTitle } from "../9-controls";

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { qNameAtom, qUrlAtom } = atoms.p4QL;

    function onValueStateChange(state: RowInputState) {
        console.log('state', state);
    }

    return (<>
        <RowInputWTitle stateAtom={qNameAtom} label="Name displayed on the mini-dashboard" onValueStateChange={onValueStateChange} />
        <RowInputWTitle stateAtom={qUrlAtom} label="Quick Link URL" />

        {/* No need to show checkbox. We can update checkbox by content of mini-dashboard name */}
        {/* <DashboardOption atoms={atoms} /> */}
        {/* <RowInputWTitle stateAtom={qUseAtom} label="Show on mini-dashboard" asCheckbox /> */}
    </>);
}

// function DashboardOption({ atoms }: { atoms: OptionsState.Atoms; }) {

//     const { qUseAtom, qUrlAtom } = atoms.p4QL;

//     const dashboard = useAtomValue(qUseAtom);

//     return (<>
//         {dashboard && (<>
//             <RowInputWTitle stateAtom={qUrlAtom} label="Quick Link URL" />
//         </>)}
//     </>);
// }
