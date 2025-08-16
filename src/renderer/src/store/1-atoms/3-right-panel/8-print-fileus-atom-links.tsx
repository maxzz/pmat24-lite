import { type FileUsAtom } from "@/store/store-types";
import { getAllFormsFields_byManiAtoms, type FieldRowCtx, type ManiAtoms } from "@/store/1-file-mani-atoms/9-types";
import { type Mani } from "@/store/manifest";

export function printFileUsAtomLinks(atm: PA<FileUsAtom | undefined>, { get }: GetOnly, label: string = 'rightPanelAtomAtom') {
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
        printManiAtoms(maniAtoms, { get });
    } else {
        console.log(`%cNo fileUs(${fileUs}) or maniAtoms(${maniAtoms})`, 'color: red');
    }

    console.groupEnd();
}

function printManiAtoms(maniAtoms: ManiAtoms, getOnly: GetOnly) {
    const { login, cpass } = getAllFormsFields_byManiAtoms(maniAtoms, getOnly);
    printFormFields(login, getOnly);
    printFormFields(cpass, getOnly);
}

function printFormFields(fields: FieldRowCtx[], { get }: GetOnly) {
    const colors: string[] = [];
    const lines: string[] = [];

    fields.forEach(
        (field) => {
            const fieldStr = get(field.labelAtom);

            const rfieldValue = get(field.rfieldAtom);
            const rfield = rfieldValue === 'in' ? ' in' : rfieldValue === 'out' ? ' out' : '   ';
            const other = `rfieldUuid:${get(field.rfieldUuidAtom)} rfield:'${rfield}'`;

            const memOnlyFromAtm = memOnlyToString(field.memOnlyAtom ? get(field.memOnlyAtom) : undefined);
            const memOnlyFromFld = memOnlyToString(field.metaField.mani.memOnly);

            lines.push(`%c    '${fieldStr}'\n%c        this.meta.uuid: %c${field.metaField.uuid}%c ${other}\n%c        fromAtm:${memOnlyFromAtm}\n%c        fromFld:${memOnlyFromFld}`);
            colors.push(
                'font-size:0.65rem; color: black',
                'font-size:0.65rem; color: forestgreen',
                'color: forestgreen',
                'font-size:0.65rem; color: forestgreen',
                'font-size:0.65rem; color: black; font-family: monospace;',
                'font-size:0.65rem; color: black; font-family: monospace;',
            );
        }
    );

    console.log(lines.join('\n'), ...colors);
}

function memOnlyToString(memOnly: Mani.MemOnly | undefined): string {
    if (!memOnly) {
        return 'memOnly:undefined';
    }
    const { formIdx, uuidThis, uuidLoginFld, dbnameInitial } = memOnly;
    return `formIdx:${formIdx} uuid.this:${uuidThis} uuid.login.fld:${uuidLoginFld} dbname.initial:${dbnameInitial}`;
}
