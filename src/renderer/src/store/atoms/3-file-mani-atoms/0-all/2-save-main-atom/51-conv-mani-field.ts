import { FieldTyp, FileMani, Meta } from "@/store/manifest";
import { FieldConv } from "../../1-fields/0-conv";

export function fieldForFileMani(
    from: FieldConv.ThisType,
    metaField: Meta.Field,
    rdir: FileMani.FieldDirection | undefined,
    isSubmit: boolean
): FileMani.Field {
    const maniField = metaField.mani;

    const value = getValue(from.value, metaField);

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

function getValue(fromValue: string | undefined, metaField: Meta.Field): string | undefined {
    const isCheckbox = metaField.ftyp === FieldTyp.check || metaField.ftyp === FieldTyp.radio;
    const v = (fromValue || '').trim().toLowerCase();
    const rv =
        isCheckbox
            ? !!v && v !== '0' && v !== 'false' && v !== 'no' && v !== 'off'
                ? '1'
                : undefined
            : v;
    return rv;
}
