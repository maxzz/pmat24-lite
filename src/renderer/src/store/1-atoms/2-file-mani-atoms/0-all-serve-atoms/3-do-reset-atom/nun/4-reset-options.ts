import { type ResetManifestCtx } from "./9-types";
import { type FormOptionsState, FormOptionsConv } from "../../../3-options";
import { FileUsCtx } from "../../../9-types";
import { FormIdx } from "@/store/manifest";

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
