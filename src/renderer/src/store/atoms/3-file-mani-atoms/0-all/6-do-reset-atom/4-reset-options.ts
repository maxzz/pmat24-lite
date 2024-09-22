import { type ResetManifestCtx } from "./9-types";
import { type ManiOptions } from "../../4-options";

export function resetFormOptions(optionsAtoms: ManiOptions.FormOptionsAtoms, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    // const { fields, submittype } = formCtx;

    // const newFields = fields.map((field) => {
    //     return {
    //         ...field,
    //         value: field.default,
    //     };
    // });

    // return {
    //     newFields,
    //     submittype,
    // };
}