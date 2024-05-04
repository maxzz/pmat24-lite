import { Getter, Setter } from "jotai";
import { Atomize } from '@/util-hooks';

export namespace SubmitConv {

    type SubmitForAtoms = {
        buttonNames: string[];
        selected: number;
        doSubmit: boolean;
    };

    export type SubmitAtoms = Prettify<Atomize<SubmitForAtoms> & { isWeb: boolean; }>;

}
