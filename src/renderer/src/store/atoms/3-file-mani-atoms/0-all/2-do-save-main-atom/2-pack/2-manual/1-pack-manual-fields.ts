import { type FormIdx, type Mani } from "@/store/manifest";
import { type PackManifestDataParams } from "../9-types";
import { type MFormCtx } from "@/store/atoms/3-file-mani-atoms";

export function packManualFields(formCtx: MFormCtx, formIdx: FormIdx, packParams: PackManifestDataParams) {
    const { newMani, get, set } = packParams;
}
