import { type Meta, type RoleStateNames } from "pm-manifest";
import { type TargetClientRect, type EngineControl, type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";

export type EngineControlMeta = {
    uuid: number;
    path: Meta.Path;
    rect?: TargetClientRect;
    role?: RoleStateNames;
};

export type EngineControlWithMeta = {
    control: EngineControl;
    meta: EngineControlMeta;
};

export type EngineControlsWithMeta = Omit<WindowControlsCollectFinalAfterParse, 'controls'> & {
    controls: EngineControlWithMeta[];
};
