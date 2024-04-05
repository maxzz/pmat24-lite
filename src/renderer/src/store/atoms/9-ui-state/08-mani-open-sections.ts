import { FormIdx } from "@/store/store-types";

export type FormOpenSections ={
    [FormIdx.login]: string[],
    [FormIdx.cpass]: string[],
}

export const defaultFormOpenSections: FormOpenSections = {
    [FormIdx.login]: [],
    [FormIdx.cpass]: [],
}
