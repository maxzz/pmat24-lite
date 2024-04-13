import { useAtom } from 'jotai';
import { FormOptionsAtoms } from '../0-all/0-create-atoms';
import { RowInput } from '../4-controls';

export function Part1General({ atoms }: { atoms: FormOptionsAtoms; }) {
    const [name, setName] = useAtom(atoms.uiPart1General.nameAtom);
    const [desc, setDesc] = useAtom(atoms.uiPart1General.descAtom);
    const [hint, setHint] = useAtom(atoms.uiPart1General.hintAtom);
    const [balloon, setBalloon] = useAtom(atoms.uiPart1General.balloonAtom);

    return (<>
        <div className="">
            Managed login name
        </div>
        <RowInput value={name} onChange={(e) => setName(e.target.value)} />

        <div className="">
            Description
        </div>
        <RowInput value={desc} onChange={(e) => setDesc(e.target.value)} />

        <div className="">
            User hint
        </div>
        <RowInput value={hint} onChange={(e) => setHint(e.target.value)} />

        <div className="">
            Show balloon
        </div>
        <RowInput value={balloon} onChange={(e) => setBalloon(+e.target.value)} /> {/* TODO: add validation */}
    </>);
}
