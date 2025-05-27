import { FormIdx } from "@/store/manifest";

export type FormOpenSections = {
    [FormIdx.login]: string[],
    [FormIdx.cpass]: string[],
};

export const defaultFormOpenSections: FormOpenSections = {
    [FormIdx.login]: [],
    [FormIdx.cpass]: [],
};
