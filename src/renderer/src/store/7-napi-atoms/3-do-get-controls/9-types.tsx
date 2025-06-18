import { type Meta, type RoleStateNames } from "pm-manifest";
import { type Rect4, type EngineControl, type WindowControlsCollectFinalAfterParse } from "@shared/ipc-types";

export type EngineControlMeta = {
    uuid: number;
    path: Meta.Path;
    rect?: Rect4;
    role?: RoleStateNames;
};

export type EngineControlWithMeta = {
    control: EngineControl;
    meta: EngineControlMeta;
};

export type EngineControlsWithMeta = Omit<WindowControlsCollectFinalAfterParse, 'controls'> & {
    controls: EngineControlWithMeta[];
};
