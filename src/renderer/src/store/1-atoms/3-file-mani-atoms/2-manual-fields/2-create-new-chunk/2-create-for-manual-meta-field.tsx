import { createEmptyValueLife, FieldTyp, type Meta, uuid } from "@/store/manifest";
import { createForManualManiField } from "./1-create-for-manual-mani-field";

export function createForManualMetaField(password: boolean): Meta.Field {
    const rv: Meta.Field = {
        mani: createForManualManiField(password),
        ftyp: FieldTyp.edit,
        life: createEmptyValueLife({ fType: FieldTyp.edit }),
        path: {},
        pidx: 0, // index is irrelevant for manual fields for now
        ridx: 0, // index is irrelevant for manual fields for now
        uuid: uuid.asRelativeNumber(),
    };
    return rv;
}
