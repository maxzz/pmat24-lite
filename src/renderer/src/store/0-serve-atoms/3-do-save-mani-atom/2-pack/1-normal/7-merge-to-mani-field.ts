import { FieldTyp, Mani, type EditorField } from "@/store/8-manifest";

type MergeManiFieldsProps = {
    from: EditorField.Members;  // from editor
    maniField: Mani.Field;      // from loaded manifest
    ftyp: FieldTyp;
    isSubmit: boolean;
};

export function mergeToManiField({ from, maniField, ftyp, isSubmit }: MergeManiFieldsProps): Mani.Field {

    const restoreLink = from.rfieldform === Mani.FORMNAME.noname && maniField.rfieldform === Mani.FORMNAME.brokenFcLink; // It was broken now but who knows which fc will be loaded next time
    //TODO: this is still not true if user explicitly set it to not use fc.
    // I guess we should remove maniField.rfieldform Mani.FORMNAME.brokenFcLink when user set it to not use fc.
    // There is no good way to perform reset operation on maniField.rfieldform (maybe to have in addition Mani.FORMNAME.brokenFcLink2?).

    const rv: Mani.Field = {
        ...maniField,
        ...from,
        submit: isSubmit,
        rfieldform: restoreLink ? Mani.FORMNAME.fieldcatalog : from.rfieldform,
    };

    (maniField.password && !from.password) && (rv.password = undefined); // case when manual mode password became text

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
