import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowBoolean } from '../4-controls';

export function Part3Authentication({ atoms }: { atoms: OptionsState.Atoms; }) {
    
    const { aimAtom, lockAtom } = atoms.uiPart3Authentication;

    return (<>
        <div className="mb-1" title="Start authentication immediately">
            Authenticate immediately
        </div>
        <RowBoolean className="mb-1 justify-self-start" useItAtom={aimAtom} />

        <div className="">
            Lock out login fields
        </div>
        <RowBoolean className="justify-self-start" useItAtom={lockAtom} />
    </>);
}
