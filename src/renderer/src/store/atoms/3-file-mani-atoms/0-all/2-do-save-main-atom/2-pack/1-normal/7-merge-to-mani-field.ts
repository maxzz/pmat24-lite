import { FieldTyp, Mani, type EditorField } from "@/store/manifest";

type MergeManiFieldsProps = {
    from: EditorField.Members;  // from editor
    maniField: Mani.Field;      // from loaded manifest
    ftyp: FieldTyp;
    isSubmit: boolean;
};

export function mergeToManiField({ from, maniField, ftyp, isSubmit }: MergeManiFieldsProps): Mani.Field {
    const rv: Mani.Field = {
        ...maniField,
        ...from,
        submit: isSubmit,
        // We don't need it since we set this to field in parced manifest, not to rfieldFormAtom.
        // rfieldform: from.rfieldform === Mani.FORMNAME.brokenFcLink ? Mani.FORMNAME.fieldcatalog : from.rfieldform, // It was broken now but who knows which fc will be loaded next time
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

//TODO: set Mani.FORMNAME.brokenFcLink when fc item removed by user (was set to use fc but removed)
