import { useAtom } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput, RowBoolean } from '../4-controls';

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { dashboardAtom, nameAtom, urlAtom } = atoms.uiPart4QL;

    const [dashboard, setDashboard] = useAtom(dashboardAtom);
    const [name, setName] = useAtom(nameAtom);
    const [url, setUrl] = useAtom(urlAtom);

    return (<>
        <div className="">
            Quick Link URL
        </div>
        <RowInput value={url} onChange={(e) => setUrl(e.target.value)} />

        <div className="my-1">
            Display on mini-dashboard
        </div>
        <RowBoolean className="my-1 justify-self-start" useItAtom={dashboardAtom} />

        {dashboard && <>
            <div className="">
                Quick Link Name
            </div>
            <RowInput value={name} onChange={(e) => setName(e.target.value)} />
        </>}
    </>);
}
