import { useAtom } from 'jotai';
import { FormOptionsAtoms } from '../0-all/0-create-atoms';
import { RowInput } from '../4-controls';

export function Part5PasswordManagerIcon({ atoms }: { atoms: FormOptionsAtoms; }) {
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
