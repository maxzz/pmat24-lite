import { useAtom } from 'jotai';
import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInput, RowInputWLabel } from '../4-controls';

export function Part5PasswordManagerIcon({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { idAtom, locAtom } = atoms.uiPart5PasswordManagerIcon;

    // const [id, setId] = useAtom(idAtom);
    // const [loc, setLoc] = useAtom(locAtom);

    return (<>
        <RowInputWLabel stateAtom={idAtom} label="Location ID" />
        {/* <div className="">
            Location ID
        </div>
        <RowInput value={id} onChange={(e) => setId(e.target.value)} /> */}

        <RowInputWLabel stateAtom={locAtom} label="Location" />
        {/* <div className="">
            Location
        </div>
        <RowInput value={loc} onChange={(e) => setLoc(e.target.value)} /> */}
    </>);
}
