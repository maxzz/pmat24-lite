import { type ResetManifestCtx } from "./9-types";
import { type FormOptionsState, FormOptionsConv } from "../../../4-options";
import { FileUsCtx } from "../../../9-types";
import { FormIdx } from "@/store/manifest";

export function resetFormOptions(optionsAtoms: FormOptionsState.AllAtoms, formIdx: FormIdx, ctx: ResetManifestCtx) {
    const { get, set } = ctx;

    const fileUsCtx: FileUsCtx = {
        fileUs: ctx.fileUs,
        fileUsAtom: ctx.fileUsAtom,
        formIdx,
    };

    const values = FormOptionsConv.forAtoms(fileUsCtx);
    FormOptionsConv.valuesToAtoms(values, optionsAtoms, get, set);

    if (formIdx === FormIdx.login) {
        set(fileUsCtx.fileUs.parsedSrc.stats.loginFormChooseNameAtom, values.p1General.name);
    }
}
