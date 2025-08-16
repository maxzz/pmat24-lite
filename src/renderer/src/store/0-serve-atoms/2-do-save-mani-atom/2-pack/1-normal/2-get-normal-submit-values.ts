import { type NFormCnt } from "@/store/1-file-mani-atoms/9-types";
import { type PackManifestDataParams } from "../9-types";
import { type SubmitFieldTypes, SubmitConv } from "@/store/1-file-mani-atoms/1-normal-fields";

export function getNormalSubmitValues(cnt: NFormCnt, packParams: PackManifestDataParams): SubmitFieldTypes.ForAtoms {
    // 1. Submits

    const submits = SubmitConv.fromAtoms(cnt.submitCtx, packParams.getset);

    //console.log('submits', JSON.stringify(submits.buttonNameItems.map( (submit) => ({ name: submit.name, uuid: submit.metaField?.uuid, }) ), null, 2));

    return submits;
}
