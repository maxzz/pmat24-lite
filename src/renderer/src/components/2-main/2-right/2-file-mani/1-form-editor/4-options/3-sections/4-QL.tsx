import { useAtom } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput, RowBoolean, RowInputWLabel } from '../4-controls';

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { dashboardAtom, nameAtom, urlAtom } = atoms.uiPart4QL;

    const [dashboard, setDashboard] = useAtom(dashboardAtom); //TODO: move it out to a separate component
    // const [name, setName] = useAtom(nameAtom);
    // const [url, setUrl] = useAtom(urlAtom);

    return (<>
        <RowInputWLabel stateAtom={nameAtom} label="Quick Link URL" />
        {/* <div className="">
            Quick Link URL
        </div>
        <RowInput value={url} onChange={(e) => setUrl(e.target.value)} /> */}

        <RowInputWLabel stateAtom={dashboardAtom} label="Display on mini-dashboard" />
        {/* <div className="my-1">
            Display on mini-dashboard
        </div>
        <RowBoolean className="my-1 justify-self-start" useItAtom={dashboardAtom} /> */}

        {dashboard && <>
            <RowInputWLabel stateAtom={urlAtom} label="Quick Link Name" />
            {/* <div className="">
                Quick Link Name
            </div>
            <RowInput value={name} onChange={(e) => setName(e.target.value)} /> */}
        </>}
    </>);
}
