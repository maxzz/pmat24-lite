import { type Atomize } from "@/util-hooks";
import { type EditorField, type Meta } from "@/store/manifest";

export namespace NormalField {

    type ForAtoms = EditorField.ForAtoms;

    export type RowAtoms = Prettify<
        & Atomize<ForAtoms>
        & {
            metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: ForAtoms;         // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;

    /**
     * Fields that are used in this editor
     */
    export type ThisType = EditorField.Type;
}
