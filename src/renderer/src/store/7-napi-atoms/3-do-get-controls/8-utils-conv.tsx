import { type MPath, type RoleStateNames, FieldPath, getRoleStateNames } from "@/store/8-manifest";
import { type Rect4 } from "@shared/ipc-types";

export function getRoleAndStates(p4a: MPath.p4a[] | undefined): RoleStateNames | undefined {
    if (!p4a?.length) {
        return;
    }
    const lastP4a = p4a.at(-1);
    return getRoleStateNames(lastP4a?.roleString);
}

export function getControlTaretRect(pathLoc: string | undefined): Rect4 | undefined {
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
