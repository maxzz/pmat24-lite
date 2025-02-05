import { FieldPath, splitPool, uuid } from "@/store/manifest";
import { type EngineControl, type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlsWithMeta, type EngineControlWithMeta } from "../9-types";
import { getControlTaretRect, getRole_old_should_be_from_manifest } from "./8-utils";

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
        const role = getRole_old_should_be_from_manifest(path.p4 || path.p4a);
        const item = {
            control,
            meta: {
                uuid: uuid.asRelativeNumber(),
                path,
                ...(rect && { rect }),
                ...(role && { role }),
            }
        };
        return item;
    });
    return rv;
}
