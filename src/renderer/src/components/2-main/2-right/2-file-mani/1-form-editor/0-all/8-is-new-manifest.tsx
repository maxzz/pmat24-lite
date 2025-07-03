import { type NFormProps, type MFormProps } from "@/store";

/**
 * Limit height for new manifests to show manifest options otherwise
 * options are hidden and user need to quess that something is below.
 */
export function isManualManifestNew(anyFormProps: NFormProps | MFormProps) {
    const anyProps = (anyFormProps as NFormProps).nFormCtx || (anyFormProps as MFormProps).mFormCtx;
    const formIdx = anyProps?.fileUsCtx.formIdx;
    const fileUs = anyFormProps.maniAtoms[formIdx]?.fileUsCtx?.fileUs;
    if (!fileUs) {
        return null;
    }
    const newManual = fileUs.fileCnt.newAsManual;
    return newManual;
}
