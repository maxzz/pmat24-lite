import { type PackManifestDataParams } from "../9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { packNormalFields } from "./2-pack-normal-fields";
import { packNormalSubmit } from "./3-pack-normal-submit";
import { getNormalFieldValues } from "./1-get-normal-fields";

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, packParams: PackManifestDataParams) {

    const editAndMeta = getNormalFieldValues(formCtx, packParams);

    packNormalFields(editAndMeta, packParams); // This should be before packNormalSubmit
    
    packNormalSubmit(formCtx, packParams);
}
