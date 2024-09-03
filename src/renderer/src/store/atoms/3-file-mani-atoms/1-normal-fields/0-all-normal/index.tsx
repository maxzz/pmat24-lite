import { type NFormCtx, type FileUsCtx, type ManiAtoms } from "../../9-types";
import { NormalFieldsState } from "../1-field-items";
import { NormalSubmitState } from "../2-submit";

export namespace NormalModeState {
    export function createNormalCtx(fileUsCtx: FileUsCtx, maniAtoms: ManiAtoms): NFormCtx {
        return {
            fieldsAtoms: NormalFieldsState.createFieldsCtx(fileUsCtx, maniAtoms),
            submitAtoms: NormalSubmitState.createSubmitCtx(fileUsCtx, maniAtoms),
        };
    }

}
