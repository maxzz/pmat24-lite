import { FormIdx } from "@/store/store-types";

export type FormOpenOptions = {
    [FormIdx.login]: Record<string, boolean>,
    [FormIdx.cpass]: Record<string, boolean>,
};

export const defaultFormOpenOptions: FormOpenOptions = {
    [FormIdx.login]: {},
    [FormIdx.cpass]: {},
};
