import { type PrimitiveAtom as PA } from "jotai";
import { type Atomize } from "@/utils";
import { type EditorField, type Meta } from "@/store/manifest";
import { FceItem } from "@/store/1-atoms/4-field-catalogs";

export namespace NormalField {

    export type RowCtx = Prettify<
        Atomize<EditorField.ForAtoms>
        & {
            metaField: Meta.Field;                  // All fields from original to combine with fields from atoms to create new field
            fromFile: EditorField.ForAtoms;         // Original state to compare with
            fromFcAtom: PA<FceItem | undefined>;    // Reactive link to FC item: initialized after FC loaded, removed when field deteted from FC, or selected not from FC
            isCpassForm: boolean;                   // Is this field inisde cpass form
        }
    >;
}
