import { type NFormCnt, type FileUsCtx } from "../../9-types";
import { NormalFieldsState } from "./1-n-create-fields-content";
import { NormalSubmitState } from "./2-n-create-submit-content";

export namespace NormalModeState {
    export function createNormalFormCnt(fileUsCtx: FileUsCtx): NFormCnt {
        return {
            rowCtxs: NormalFieldsState.createFieldsCnt(fileUsCtx),
            submitCtx: NormalSubmitState.createSubmitCnt(fileUsCtx),
        };
    }
}
