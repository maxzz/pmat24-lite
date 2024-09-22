import { type Atomize } from '@/util-hooks';
import { type Meta } from "@/store/manifest";

export namespace SubmitConvTypes {

    export type ButtonNameItem = {
        name: string;
        metaField: Meta.Field | null;
    };

    export type SubmitForAtoms = {
        buttonNameItems: ButtonNameItem[];
        selected: number;                   // index of selected button
        doSubmit: boolean;
        isSubmitTypeUndefined: boolean;     // Mani form options submittype was initially undefined
    };

    export type SubmitForAtomsAtomized = Atomize<SubmitForAtoms>;

    export type SubmitAtoms = Prettify<
        SubmitForAtomsAtomized & {
            isWeb: boolean;                 // is web form
            metaForm: Meta.Form;            // meta form from manifest
            fromFile: SubmitForAtoms;       // original state to compare with
        }
    >;
}