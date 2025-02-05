import { FieldPath, type MPath, MSAA_ROLE, type RoleStateNames, splitPool, uuid } from "@/store/manifest";
import { type EngineControl, type TargetClientRect, type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";
import { type EngineControlsWithMeta, type EngineControlWithMeta } from "../9-types";

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

    function addMetaToEngineControls(pool: string[], controls: EngineControl[]): EngineControlWithMeta[] {
        const rv = controls.map((control) => {
            const path = FieldPath.fieldPathItems(pool, control.path);
            const rect = getControlTaretRect(path.loc);
            const role = getRole(path.p4 || path.p4a);
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

    function getRole(p4a: MPath.p4a[] | undefined): RoleStateNames | undefined {
        if (!p4a?.length) {
            return;
        }
        const lastP4a = p4a.at(-1);
        const parts = lastP4a?.roleString?.split('_');

        if (!lastP4a?.roleString || !parts?.length || !parts[0]) {
            return;
        }

        const roleNum = parseInt(parts[0], 16);
        const roleName = MSAA_ROLE[roleNum];
        const stateNum = parts[1] || 0;

        return {
            raw: lastP4a?.roleString,
            role: roleName,
            states: [`${stateNum}`],
        };
    }

    function getControlTaretRect(pathLoc: string | undefined): TargetClientRect | undefined {
        const loc = FieldPath.loc.getControlRect(pathLoc);
        if (loc) {
            return {
                left: loc[0],      // x1.x
                top: loc[1],       // x1.y
                right: loc[2],     // x2.x
                bottom: loc[3],    // x2.y
            };
        }
    }
}
