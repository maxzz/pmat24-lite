import { type NFormCtx } from "@/store/1-atoms/3-file-mani-atoms";
import { type PackManifestDataParams } from "../9-types";
import { SubmitConv, type SubmitFieldTypes } from "../../../../1-normal-fields";

export function getNormalSubmitValues(formCtx: NFormCtx, packParams: PackManifestDataParams): SubmitFieldTypes.ForAtoms {
    const { get, set } = packParams;

    // 1. Submits

    const submits = SubmitConv.fromAtoms(formCtx.submitCtx, get, set);

    //console.log('submits', JSON.stringify(submits.buttonNameItems.map( (submit) => ({ name: submit.name, uuid: submit.metaField?.uuid, }) ), null, 2));

    return submits;
}
