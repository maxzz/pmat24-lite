import { type PackManifestDataParams } from "../9-types";
import { type SubmitConvTypes, type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { packNormalFields } from "./1-pack-normal-fields";
import { packNormalSubmit } from "./5-pack-normal-submit";
import { getNormalFieldValues } from "./2-get-normal-fields";

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, packParams: PackManifestDataParams) {

    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    packNormalFields(editAndMeta, packParams); // This should be before packNormalSubmit
    
    const submits: SubmitConvTypes.SubmitForAtoms = packNormalSubmit(formCtx, packParams); // Options should called before submit or set form submit here
}
