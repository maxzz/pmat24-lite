import { type NFormCtx, type FileUsCtx, type ManiAtoms } from "../../9-types";
import { NormalFieldsState } from "./1-create-fields-context";
import { NormalSubmitState } from "./2-create-submit-context";

export namespace NormalModeState {
    export function createNormalCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): NFormCtx {
        return {
            rowCtxs: NormalFieldsState.createFieldsCtx(fileUsCtx, maniAtoms),
            submitCtx: NormalSubmitState.createSubmitCtx(fileUsCtx, maniAtoms),
        };
    }

}
