import { FormIdx } from "@/store/store-types";
import { proxy } from "valtio";

export type FormOpenSections ={
    login: string[],
    cpass: string[],
}

export const formOpenSections = proxy<FormOpenSections>({
    login: [],
    cpass: [],
});
