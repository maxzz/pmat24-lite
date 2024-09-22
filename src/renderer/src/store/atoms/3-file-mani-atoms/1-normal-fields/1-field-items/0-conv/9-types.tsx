import { type Atomize } from "@/util-hooks";
import { type EditorField, type Meta } from "@/store/manifest";

export namespace NormalField {

    export type RowAtoms = Prettify<
        & Atomize<EditorField.ForAtoms>
        & {
            metaField: Meta.Field;          // all fields from original to combine with fields from atoms to create new field
            fromFile: EditorField.ForAtoms; // original state to compare with
        }
    >;
}
