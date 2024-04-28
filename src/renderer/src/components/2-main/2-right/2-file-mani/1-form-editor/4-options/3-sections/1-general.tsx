import { useAtom } from 'jotai';
import { FormOptionsAtoms } from '../../../0-all/0-create-ui-atoms/4-options';
import { RowInput } from '../4-controls';
import { RowInputWLabel } from '../4-controls/4-row-input-w-label';

export function Part1General({ atoms }: { atoms: FormOptionsAtoms; }) {
    return (<>
        <RowInputWLabel valueAtom={atoms.uiPart1General.nameAtom} label="Managed login name" />
        <RowInputWLabel valueAtom={atoms.uiPart1General.descAtom} label="Description" />
        <RowInputWLabel valueAtom={atoms.uiPart1General.hintAtom} label="User hint" />
        <RowInputWLabel valueAtom={atoms.uiPart1General.balloonAtom} label="Show balloon" />
    </>);
}

//TODO: add validation
