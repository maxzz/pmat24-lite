import { type NFormCnt, type FileUsCtx, type ManiAtoms } from "../../9-types";
import { NormalFieldsState } from "./1-create-fields-content";
import { NormalSubmitState } from "./2-create-submit-content";

export namespace NormalModeState {
    export function createNormalCnt(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): NFormCnt {
        return {
            rowCtxs: NormalFieldsState.createFieldsCnt(fileUsCtx, maniAtoms),
            submitCtx: NormalSubmitState.createSubmitCnt(fileUsCtx, maniAtoms),
        };
    }

}
