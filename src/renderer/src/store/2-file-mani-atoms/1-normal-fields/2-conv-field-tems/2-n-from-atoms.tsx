import { type EditorField } from "@/store/8-manifest";
import { type NormalField } from "./9-types";

export function fromAtoms(rowCtx: NormalField.RowCtx, { get }: GetOnly): EditorField.ForAtoms {

    const rv: EditorField.ForAtoms = {
        useIt: get(rowCtx.useItAtom),
        label: get(rowCtx.labelAtom),
        type: get(rowCtx.typeAtom),
        valueLife: get(rowCtx.valueLifeAtom),
        dbname: get(rowCtx.dbnameAtom),
        policies: get(rowCtx.policiesAtom),

        rfield: get(rowCtx.rfieldAtom),
        rfieldUuid: get(rowCtx.rfieldUuidAtom),
        rfieldForm: get(rowCtx.rfieldFormAtom),

        memOnly: get(rowCtx.memOnlyAtom),
    };

    return rv;
}
