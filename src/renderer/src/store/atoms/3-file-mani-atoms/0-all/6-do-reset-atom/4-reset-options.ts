import { type ResetManifestCtx } from "./9-types";
import { type ManiOptions, OptionsConv } from "../../4-options";
import { FileUsCtx } from "../../9-types";
import { FormIdx } from "@/store/manifest";

export function resetFormOptions(optionsAtoms: ManiOptions.FormOptionsAtoms, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    const fileUsCtx: FileUsCtx = {
        fileUs: ctx.fileUs,
        fileUsAtom: ctx.fileUsAtom,
        formIdx,
    };

    const a = OptionsConv.forAtoms(fileUsCtx);

}