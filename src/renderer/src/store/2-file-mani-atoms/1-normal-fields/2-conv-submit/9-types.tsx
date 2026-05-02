import { type Atomize } from "@/utils";
import { type Meta } from "@/store/8-manifest";

export namespace SubmitFieldTypes {

    export type ButtonNameItem = {
        name: string;
        metaField: Meta.Field | null;
    };

    export type ForAtoms = {
        buttonNameItems: ButtonNameItem[];
        selected: number;                   // Index of selected button; 0 - don't submit otherwhise submit with selected button index
        doSubmit: boolean;
        isSubmitTypeUndefined: boolean;     // Mani form options submittype was initially undefined
    };

    export type ForAtomsAtomized = Atomize<ForAtoms>;

    export type Ctx = Prettify<
        ForAtomsAtomized & {
            isSubmitForWeb: boolean;        // Is web form
            metaForm: Meta.Form;            // Meta form from manifest
            fromFile: ForAtoms;             // Original state to compare with
        }
    >;
}