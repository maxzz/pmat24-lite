import { type PackManifestDataParams } from "../9-types";
import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms/9-types";
import { SubmitConv } from "../../../../1-normal-fields";

export function packNormalSubmit(formCtx: NFormCtx, packParams: PackManifestDataParams) {
    const { rvManifest, get, set } = packParams;

    // 1. Submits

    const submits = SubmitConv.fromAtoms(formCtx.submitAtoms, get, set);
    console.log('submits', JSON.stringify(submits.buttonNames.map(
        (submit) => ({
            name: submit.name,
            uuid: submit.metaField?.uuid,
        })
    ), null, 2));
}
