import { type Atomize } from "@/util-hooks";
import { type EditorField, type Meta } from "@/store/manifest";
import { FceItem } from "@/store/atoms/4-field-catalogs";

export namespace NormalField {

    export type RowCtx = Prettify<
        Atomize<EditorField.ForAtoms>
        & {
            metaField: Meta.Field;              // all fields from original to combine with fields from atoms to create new field
            fromFile: EditorField.ForAtoms;     // original state to compare with
            fromFc: FceItem | undefined;        // link to field catalog item: initialize after FC loaded, remove when field deteted from FC, or selected not from FC
        }
    >;
}
