import { FieldTyp, type Mani, type FileMani } from "@/store/manifest";
import { type NormalField } from "../../../../1-normal-fields";

type FieldForFileManiProps = {
    from: NormalField.ThisType; // from editor
    maniField: Mani.Field;      // from loaded manifest
    ftyp: FieldTyp;
    rdir: FileMani.FieldDirection | undefined;
    isSubmit: boolean;
};

export function fieldForFileMani({ from, maniField, ftyp, rdir, isSubmit }: FieldForFileManiProps): Mani.Field {
    //const value = getFieldStringValue(from.value, ftyp);

    const rfield = rdir?.rfield === 'in' || rdir?.rfield === 'out' ? rdir.rfield : '';
    const rfieldform = rdir?.rfieldform || 0;
    const rfieldindex = rdir?.rfieldindex || 0;

    const { 
        useit,
        displayname,
        type,
        dbname,
        value,
        password,
        askalways,
        onetvalue,
        policy,
        policy2,
        options,
     } = from;

    const rv: Mani.Field = {
        ...maniField,
        useit,
        displayname,
        type,
        dbname,
        value: getFieldStringValue(value, ftyp),
        password,
        askalways,
        onetvalue,
        policy, //TODO: we need to correlate policies with password change form
        policy2,
        options,

        // ...(from.displayname && { displayname: from.displayname }),
        // type: from.type,
        // dbname: from.dbname,
        // ...(maniField.path && { path: maniField.path }),
        // ...(maniField.path_ext && { path_ext: maniField.path_ext }),

        // ...(from.policy && { policy: from.policy }), //TODO: we need to correlate policies with password change form
        // ...(from.policy2 && { policy2: from.policy2 }),
        // ...(from.options && { options: from.options }),

        // ...(value && { value: value }),
        // ...(maniField.choosevalue && { choosevalue: maniField.choosevalue }),

        // ...(rfield && { rfield: rfield }),
        // ...(rfieldform && { rfieldform: `${rfieldform}` }),
        // ...(rfieldindex && { rfieldindex: `${rfieldindex}` }),

        // ...(from.askalways && { askalways: '1' }),
        // ...(from.onetvalue && { onetvalue: '1' }),
        // ...(from.password && { password: from.password }),
        // ...(isSubmit && { submit: '1' }),
        // ...(from.useit && { useit: '1' }),
    };

    return rv;
}

function getFieldStringValue(fromValue: string | undefined, ftyp: FieldTyp): string | undefined {

    const isCheckbox = ftyp === FieldTyp.check || ftyp === FieldTyp.radio;

    const v = (fromValue || '').trim().toLowerCase();

    const rv =
        isCheckbox
            ? (!!v && v !== '0' && v !== 'false' && v !== 'no' && v !== 'off') ? '1' : undefined
            : v;

    return rv;
}
