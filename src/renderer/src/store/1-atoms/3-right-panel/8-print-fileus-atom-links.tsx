import { type Getter, type PrimitiveAtom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { getAllFormsFields_byManiAtoms, type FieldRowCtx, type ManiAtoms } from "../2-file-mani-atoms/9-types";

export function printFileUsAtomLinks(atm: PrimitiveAtom<FileUsAtom | undefined>, get: Getter, label: string = 'rightPanelAtomAtom') {
    const thisAtom = get(atm);
    const thisAtomStr = thisAtom ? thisAtom.toString() : null;

    const expand = true;

    console[expand ? 'group' : 'groupCollapsed'](
        `%cLinks of ${label}%c ${thisAtomStr} %c links`,
        //newAtom ? 'font-weight: normal; background-color: red; color: white' : 'font-weight: normal; background-color: limegreen; color: darkgreen',
        'font-weight: normal; background-color: limegreen; color: darkgreen',
        // 'font-weight: normal; color: forestgreen',
        'font-weight: normal; background-color: limegreen; color: white',
        'font-weight: normal; color: gray',
    );

    const fileUs = thisAtom && get(thisAtom);
    const maniAtoms = fileUs && get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        printManiAtoms(maniAtoms, get);
    } else {
        console.log(`%cNo fileUs(${fileUs}) or maniAtoms(${maniAtoms})`, 'color: red');
    }

    console.groupEnd();
}

function printManiAtoms(maniAtoms: ManiAtoms, get: Getter) {
    const { login, cpass } = getAllFormsFields_byManiAtoms(maniAtoms, get);
    printFormFields(login, get);
    printFormFields(cpass, get);
}

function printFormFields(fields: FieldRowCtx[], get: Getter) {
    fields.forEach(
        (field) => {
            const fieldStr = field.labelAtom ? get(field.labelAtom) : 'null';
            console.log(`    %c${fieldStr}`, 'color: cyan');
        }
    );
}
