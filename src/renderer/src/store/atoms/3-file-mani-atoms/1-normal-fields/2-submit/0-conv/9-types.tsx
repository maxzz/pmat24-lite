import { type Atomize } from '@/util-hooks';
import { type Meta } from "@/store/manifest";

export namespace SubmitConvTypes {

    export type ButtonNameItem = {
        name: string;
        metaField: Meta.Field | null;
    };

    export type SubmitForAtoms = {
        buttonNameItems: ButtonNameItem[];
        selected: number;
        doSubmit: boolean;
        isSubmitTypeUndefined: boolean;     // doSubmit was initially undefined
    };

    export type SubmitAtoms = Prettify<
        & Atomize<SubmitForAtoms>
        & {
            isWeb: boolean;                 // is web form
            metaForm: Meta.Form;            // meta form from manifest
            fromFile: SubmitForAtoms;       // original state to compare with
        }
    >;
}