// Back to manifest

/** /
export function forMani(from: SubmitConvTypes.SubmitForAtoms, metaForm: Meta.Form) {
    const rv: ThisType = {
        useit: from.useIt,
        displayname: from.label,
        dbname: from.dbname,
        ...fieldTyp2Obj(from.type),
    };

    TransformValue.valueLife2Mani(from.valueLife, rv);
    return rv;
}
/**/
