import { useAtom } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput } from '../4-controls';

export function Part5PasswordManagerIcon({ atoms }: { atoms: OptionsState.Atoms; }) {
    
    const [id, setId] = useAtom(atoms.uiPart5PasswordManagerIcon.idAtom);
    const [loc, setLoc] = useAtom(atoms.uiPart5PasswordManagerIcon.locAtom);

    return (<>
        <div className="">
            Location ID
        </div>
        <RowInput value={id} onChange={(e) => setId(e.target.value)} />

        <div className="">
            Location
        </div>
        <RowInput value={loc} onChange={(e) => setLoc(e.target.value)} />
    </>);
}
