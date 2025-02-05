import { FieldPath, MPath, MSAA_ROLE, RoleStateNames, getRoleStateNames } from "@/store/manifest";
import { type TargetClientRect } from "@shared/ipc-types";

export function getRoleAndStates(p4a: MPath.p4a[] | undefined): RoleStateNames | undefined {
    if (!p4a?.length) {
        return;
    }
    const lastP4a = p4a.at(-1);
    return getRoleStateNames(lastP4a?.roleString);
}

export function getRole_old_should_be_from_manifest(p4a: MPath.p4a[] | undefined): RoleStateNames | undefined {
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

export function getControlTaretRect(pathLoc: string | undefined): TargetClientRect | undefined {
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
