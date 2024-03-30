import { proxy } from "valtio";

export type ManiOpenSectionKey = Prettify<keyof ManiOpenSections>;

export type ManiOpenSections = {
    form: boolean;
    fields: boolean;
    submit: boolean;
    policy: boolean;
    options: boolean;
};

export const defaultManiOpenSections: ManiOpenSections = {
    form: false,
    fields: false,
    submit: false,
    policy: false,
    options: false,
};

export const maniOpenSections: ManiOpenSections = proxy(defaultManiOpenSections);
