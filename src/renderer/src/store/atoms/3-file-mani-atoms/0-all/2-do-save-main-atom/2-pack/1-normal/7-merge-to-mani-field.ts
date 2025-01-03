import { FieldTyp, Mani, type FileMani, type EditorField } from "@/store/manifest";

type MergeManiFieldsProps = {
    from: EditorField.Members;  // from editor
    maniField: Mani.Field;      // from loaded manifest
    ftyp: FieldTyp;
    rdir: FileMani.FieldLinks | undefined;
    isSubmit: boolean;
};

export function mergeToManiField({ from, maniField, ftyp, rdir, isSubmit }: MergeManiFieldsProps): Mani.Field {
    const rfield = rdir?.rfield === 'in' || rdir?.rfield === 'out' ? rdir.rfield : undefined;
    const rfieldindex = rdir?.rfieldindex ? +rdir.rfieldindex : undefined;
    const rfieldform = rdir?.rfieldform ? +rdir.rfieldform : undefined;

    const rv: Mani.Field = {
        ...maniField,
        ...from,

        submit: isSubmit,

        rfield,
        rfieldindex,
        rfieldform,
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
