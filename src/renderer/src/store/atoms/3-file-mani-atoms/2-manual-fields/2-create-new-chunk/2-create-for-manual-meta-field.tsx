import { FieldTyp, type Meta, uuid, ValueAs } from "@/store/manifest";
import { createForManualManiField } from "./1-create-for-manual-mani-field";

export function createForManualMetaField(password: boolean): Meta.Field {
    const rv: Meta.Field = {
        mani: createForManualManiField(password),
        ftyp: FieldTyp.edit,
        life: {
            fType: FieldTyp.edit,
            valueAs: ValueAs.askReuse,
        },
        path: {},
        pidx: 0, // index is irrelevant for manual fields for now
        ridx: 0, // index is irrelevant for manual fields for now
        uuid: uuid.asRelativeNumber(),
    };
    return rv;
}
