import { FieldPath, splitPool, uuid } from "@/store/manifest";
import { type EngineControl, type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlMeta, type EngineControlWithMeta, type EngineControlsWithMeta } from "./9-types";
import { getControlTaretRect, getRoleAndStates } from "./8-utils-conv";

export function controlsReplyToEngineControlWithMeta(reply: WindowControlsCollectFinalAfterParse): EngineControlsWithMeta | null {
    const final = reply.pool && reply.controls?.length ? reply : null;
    if (!final) {
        return null;
    }

    const pool = splitPool(final.pool);

    const rv: EngineControlsWithMeta = {
        pool: final.pool,
        controls: addMetaToEngineControls(pool, final.controls)
    };

    return rv;
}

function addMetaToEngineControls(pool: string[], controls: EngineControl[]): EngineControlWithMeta[] {
    const rv = controls.map((control) => {
        const path = FieldPath.fieldPathItems(pool, control.path);
        const rect = getControlTaretRect(path.loc);
        const role = getRoleAndStates(path.p4 || path.p4a);
        const meta: EngineControlMeta = {
            uuid: uuid.asRelativeNumber(),
            path,
            ...(rect && { rect }),
            ...(role && { role }),
        };
        const item = {
            control,
            meta,
        };
        return item;
    });
    return rv;
}
