import { useAtom } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput, RowBoolean } from '../4-controls';

export function Part4QL({ atoms }: { atoms: OptionsState.Atoms; }) {
    
    const [dashboard, setDashboard] = useAtom(atoms.uiPart4QL.dashboardAtom);
    const [name, setName] = useAtom(atoms.uiPart4QL.nameAtom);
    const [url, setUrl] = useAtom(atoms.uiPart4QL.urlAtom);

    return (<>
        <div className="">
            Quick Link URL
        </div>
        <RowInput value={url} onChange={(e) => setUrl(e.target.value)} />

        <div className="my-1">
            Display on mini-dashboard
        </div>
        <RowBoolean className="my-1 justify-self-start" useItAtom={atoms.uiPart4QL.dashboardAtom} />

        {dashboard && <>
            <div className="">
                Quick Link Name
            </div>
            <RowInput value={name} onChange={(e) => setName(e.target.value)} />
        </>}
    </>);
}
