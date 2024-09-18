import { type NFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { type PackManifestDataParams } from "../9-types";
import { SubmitConv, type SubmitConvTypes } from "../../../../1-normal-fields";

export function getNormalSubmitValues(formCtx: NFormCtx, packParams: PackManifestDataParams): SubmitConvTypes.SubmitForAtoms {
    const { get, set } = packParams;

    // 1. Submits

    const submits = SubmitConv.fromAtoms(formCtx.submitAtoms, get, set);

    //console.log('submits', JSON.stringify(submits.buttonNameItems.map( (submit) => ({ name: submit.name, uuid: submit.metaField?.uuid, }) ), null, 2));

    return submits;
}
