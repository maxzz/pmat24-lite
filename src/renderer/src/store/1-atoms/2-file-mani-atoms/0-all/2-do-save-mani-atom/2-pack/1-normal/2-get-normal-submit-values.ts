import { type NFormCnt } from "@/store/1-atoms/2-file-mani-atoms";
import { type PackManifestDataParams } from "../9-types";
import { SubmitConv, type SubmitFieldTypes } from "../../../../1-normal-fields";

export function getNormalSubmitValues(formCnt: NFormCnt, packParams: PackManifestDataParams): SubmitFieldTypes.ForAtoms {
    const { get, set } = packParams;

    // 1. Submits

    const submits = SubmitConv.fromAtoms(formCnt.submitCtx, get, set);

    //console.log('submits', JSON.stringify(submits.buttonNameItems.map( (submit) => ({ name: submit.name, uuid: submit.metaField?.uuid, }) ), null, 2));

    return submits;
}
