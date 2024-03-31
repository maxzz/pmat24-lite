import { FormIdx } from "@/store/store-types";
import { proxy } from "valtio";

export type FormOpenSections ={
    [FormIdx.login]: string[],
    [FormIdx.cpass]: string[],
}

export const formOpenSections = proxy<FormOpenSections>({
    [FormIdx.login]: [],
    [FormIdx.cpass]: [],
});
