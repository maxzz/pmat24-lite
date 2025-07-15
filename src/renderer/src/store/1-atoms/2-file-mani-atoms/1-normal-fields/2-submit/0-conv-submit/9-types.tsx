import { type Atomize } from '@/utils';
import { type Meta } from "@/store/manifest";

export namespace SubmitFieldTypes {

    export type ButtonNameItem = {
        name: string;
        metaField: Meta.Field | null;
    };

    export type ForAtoms = {
        buttonNameItems: ButtonNameItem[];
        selected: number;                   // index of selected button
        doSubmit: boolean;
        isSubmitTypeUndefined: boolean;     // Mani form options submittype was initially undefined
    };

    export type ForAtomsAtomized = Atomize<ForAtoms>;

    export type Ctx = Prettify<
        ForAtomsAtomized & {
            isWeb: boolean;                 // is web form
            metaForm: Meta.Form;            // meta form from manifest
            fromFile: ForAtoms;             // original state to compare with
        }
    >;
}