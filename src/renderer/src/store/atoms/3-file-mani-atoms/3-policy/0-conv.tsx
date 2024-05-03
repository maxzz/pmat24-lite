import { Getter, Setter } from "jotai";
import { Atomize } from '@/util-hooks';

export namespace PolicyConv {

    type PolicyForAtoms = {
        policy: string;
        policy2: string;
    };
    
    export type PolicyAtoms = Prettify<Atomize<PolicyForAtoms>>;
    
}
