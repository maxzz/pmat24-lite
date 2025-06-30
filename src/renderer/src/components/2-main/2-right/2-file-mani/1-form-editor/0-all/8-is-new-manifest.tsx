import { type NFormContextProps, type MFormContextProps } from "@/store";

/**
 * Limit height for new manifests to show manifest options otherwise
 * options are hidden and user need to quess that something is below.
 */
export function isManualManifestNew(ctx: NFormContextProps | MFormContextProps) {
    const fileUs = ctx.maniAtoms[ctx.formIdx]?.fileUsCtx?.fileUs;
    if (!fileUs) {
        return null;
    }
    const newManual = fileUs.fileCnt.newAsManual;
    return newManual;
}
