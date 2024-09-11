import { type PackManifestDataParams } from "../9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { packNormalFields } from "./1-pack-normal-fields";
import { packNormalSubmit } from "./2-pack-normal-submit";

export function packNormalFieldsAndSubmit(formCtx: NFormCtx, packParams: PackManifestDataParams) {
    packNormalFields(formCtx, packParams); // This should be before packNormalSubmit
    packNormalSubmit(formCtx, packParams);
}
