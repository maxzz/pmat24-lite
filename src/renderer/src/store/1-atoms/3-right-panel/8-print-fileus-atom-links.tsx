import { type Getter, type PrimitiveAtom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { getAllFormsFields_byManiAtoms, type FieldRowCtx, type ManiAtoms } from "../2-file-mani-atoms/9-types";
import { type Mani } from "@/store/manifest";

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
    const colors: string[] = [];
    const lines: string[] = [];

    fields.forEach(
        (field) => {
            const fieldStr = field.labelAtom ? get(field.labelAtom) : 'null';
            const memOnlyFromAtm = memOnlyToString(field.memOnlyAtom ? get(field.memOnlyAtom) : undefined);
            const memOnlyFromFld = memOnlyToString(field.metaField.mani.memOnly);

            lines.push(`%c        this.meta.uuid: %c${field.metaField.uuid}\n %c        fromAtm:${memOnlyFromAtm}\n %c        fromFld:${memOnlyFromFld}\n        %c'${fieldStr}'`);
            colors.push(
                'font-size:0.5rem; color: forestgreen',
                'color: forestgreen',
                'font-size:0.5rem; color: black; font-family: monospace; font-face: Consolas',
                'font-size:0.5rem; color: black; font-family: monospace; font-face: Consolas',
                'color: black',
            );
        }
    );

    console.log(lines.join('\n'), ...colors);
}

function memOnlyToString(memOnly: Mani.MemOnly['memOnly'] | undefined): string {
    if (!memOnly) {
        return 'memOnly:undefined';
    }
    const { formIdx, uuidThis, uuidLoginFld, dbnameInitial } = memOnly;
    return `form:${formIdx} uuidThis:${uuidThis} uuidLoginFld:${uuidLoginFld} dbnameInitial:${dbnameInitial}`;
}
