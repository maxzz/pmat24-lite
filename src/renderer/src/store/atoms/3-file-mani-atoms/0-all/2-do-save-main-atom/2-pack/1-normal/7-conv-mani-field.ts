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
    const rfield = rdir?.rfield === 'in' || rdir?.rfield === 'out' ? rdir.rfield : undefined;
    const rfieldform = rdir?.rfieldform;
    const rfieldindex = rdir?.rfieldindex ? +rdir.rfieldindex : undefined;

    const rv: Mani.Field = {
        ...maniField,
        ...from,

        submit: isSubmit,

        rfield,
        rfieldform,
        rfieldindex,
    };

    rv.value = getFieldStringValue(from.value, ftyp);
    //TODO: we need to correlate policies with password change form

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
