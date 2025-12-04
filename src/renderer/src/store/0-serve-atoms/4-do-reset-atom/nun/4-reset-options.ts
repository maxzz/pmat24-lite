import { FormIdx } from "@/store/8-manifest";
import { type FormOptionsState, FormOptionsConv } from "@/store/2-file-mani-atoms/3-options";
import { type FileUsCtx } from "@/store/2-file-mani-atoms/9-types";
import { type ResetManifestCtx } from "./9-types";

export function resetFormOptions(optionsAtoms: FormOptionsState.AllAtoms, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const fileUsCtx: FileUsCtx = {
        fileUs: ctx.fileUs,
        fileUsAtom: ctx.fileUsAtom,
        formIdx,
    };

    const values = FormOptionsConv.forAtoms(fileUsCtx);
    FormOptionsConv.valuesToAtoms(values, optionsAtoms, ctx);

    if (formIdx === FormIdx.login) {
        ctx.set(fileUsCtx.fileUs.parsedSrc.stats.loginFormChooseNameAtom, values.p1General.name);
    }
}
