import { type Atomize } from "@/util-hooks";
import { FieldTyp, type Mani, type Meta, type ValueLife } from "pm-manifest";

export namespace NormalField {

    export type ForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife;           // this includes value and valueAs
        dbname: string;                 //TODO: field guid from manifest or field catalog; fieldCat was a dbname duplicate
        policies: Mani.FieldPolicy;     // policy, policy2, options
    };

    export type FieldAtoms = Prettify<
        & Atomize<ForAtoms>
        & {
            metaField: Meta.Field;      // all fields from original to combine with fields from atoms to create new field
            fromFile: ForAtoms;    // original state to compare with
            changed: boolean;           // state from atoms is different from original state
        }
    >;

    /**
     * Fields that are used in this editor
     */
    export type ThisType = Pick<Mani.Field,
        | 'useit'
        | 'displayname'
        | 'type'
        | 'dbname'
        | 'value' // | 'choosevalue' - so far cannot be changed
        | 'password'
        | 'askalways'
        | 'onetvalue'
        | 'policy'
        | 'policy2'
        | 'options'
    >;
}