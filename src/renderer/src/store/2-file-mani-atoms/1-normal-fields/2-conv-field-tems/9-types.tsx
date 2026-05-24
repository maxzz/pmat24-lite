import { type PrimitiveAtom as PA } from "jotai";
import { type Atomize } from "@/utils";
import { type EditorField, type Meta } from "@/store/8-manifest";
import { FceItem } from "@/components/4-dialogs/4-dlg-field-catalog/a-field-catalog-atoms";

export namespace NormalField {

    export type RowCtx = Prettify<
        Atomize<EditorField.ForAtoms>
        & {
            metaField: Meta.Field;                  // All fields from original to combine with fields from atoms to create new field
            fromFile: EditorField.ForAtoms;         // Original state to compare with
            fromFcAtom: PA<FceItem | undefined>;    // Reactive link to FC item: initialized after FC loaded, removed when field deteted from FC, or selected not from FC
        }
    >;
}
