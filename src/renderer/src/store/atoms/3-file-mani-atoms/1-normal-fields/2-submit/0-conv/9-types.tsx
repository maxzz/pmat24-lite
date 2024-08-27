import { type Atomize } from '@/util-hooks';
import { type Meta } from "pm-manifest";

export namespace SubmitConvTypes {

    export type SubmitForAtoms = {
        buttonNames: string[];
        selected: number;
        doSubmit: boolean;
        isDoSubmitUndefined: boolean;   // doSubmit was initially undefined
    };

    export type SubmitAtoms = Prettify<
        & Atomize<SubmitForAtoms>
        & {
            isWeb: boolean;                 // is web form
            metaForm: Meta.Form;            // meta form from manifest
            fromFile: SubmitForAtoms;       // original state to compare with
            changed: boolean;               // state from atoms is different from original state
        }
    >;
}