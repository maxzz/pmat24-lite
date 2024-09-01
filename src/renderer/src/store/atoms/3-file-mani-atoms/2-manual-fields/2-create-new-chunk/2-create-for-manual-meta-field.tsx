import { FieldTyp, type Meta, uuid, ValueAs } from "@/store/manifest";
import { createForManualManiField } from "./1-create-for-manual-mani-field";

export function createForManualMetaField(): Meta.Field {
    const rv: Meta.Field = {
        mani: createForManualManiField(),
        ftyp: FieldTyp.text,
        life: {
            valueAs: ValueAs.askReuse,
        },
        path: {},
        pidx: 0, // index is irrelevant for manual fields for now
        ridx: 0, // index is irrelevant for manual fields for now
        uuid: uuid.asRelativeNumber(),
    };
    return rv;
}
