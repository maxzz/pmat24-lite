import { OptionsState } from '@/store/atoms/3-file-mani-atoms/4-options';
import { RowInputWLabel } from '../4-controls/4-row-input-w-label';

export function Part1General({ atoms }: { atoms: OptionsState.Atoms; }) {

    const { nameAtom, descAtom, hintAtom, balloonAtom } = atoms.uiPart1General;
    
    return (<>
        <RowInputWLabel valueAtom={nameAtom} label="Managed login name" />
        <RowInputWLabel valueAtom={descAtom} label="Description" />
        <RowInputWLabel valueAtom={hintAtom} label="User hint" />
        <RowInputWLabel valueAtom={balloonAtom} label="Show balloon" />
    </>);
}

//TODO: add validation
