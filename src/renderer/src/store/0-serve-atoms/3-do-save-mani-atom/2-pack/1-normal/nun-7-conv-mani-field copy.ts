import { FieldTyp, type Mani, type FileMani, type EditorField } from "@/store/8-manifest";

type FieldForFileManiProps = {
    from: EditorField.Members;  // from editor
    maniField: Mani.Field;      // from loaded manifest
    ftyp: FieldTyp;
    rdir: FileMani.FieldLinks | undefined;
    isSubmit: boolean;
};

export function fieldForFileMani({ from, maniField, ftyp, rdir, isSubmit }: FieldForFileManiProps): FileMani.Field {
    
    const value = getFieldStringValue(from.value, ftyp);

    const rfield = rdir?.rfield === 'in' || rdir?.rfield === 'out' ? rdir.rfield : '';
    const rfieldform = rdir?.rfieldform || 0;
    const rfieldindex = rdir?.rfieldindex || 0;

    const rv: FileMani.Field = {
        ...(from.displayname && { displayname: from.displayname }),
        type: from.type,
        dbname: from.dbname,
        ...(maniField.path && { path: maniField.path }),
        ...(maniField.path_ext && { path_ext: maniField.path_ext }),

        ...(from.policy && { policy: from.policy }), //TODO: we need to correlate policies with password change form
        ...(from.policy2 && { policy2: from.policy2 }),
        ...(from.options && { options: from.options }),

        ...(value && { value: value }),
        ...(maniField.choosevalue && { choosevalue: maniField.choosevalue }),

        ...(rfield && { rfield: rfield }),
        ...(rfieldform && { rfieldform: `${rfieldform}` }),
        ...(rfieldindex && { rfieldindex: `${rfieldindex}` }),

        ...(from.askalways && { askalways: '1' }),
        ...(from.onetvalue && { onetvalue: '1' }),
        ...(from.password && { password: '1' }),
        ...(isSubmit && { submit: '1' }),
        ...(from.useit && { useit: '1' }),
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
