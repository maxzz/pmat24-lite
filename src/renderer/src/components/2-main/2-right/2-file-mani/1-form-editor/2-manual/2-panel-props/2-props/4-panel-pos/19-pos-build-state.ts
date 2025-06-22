import { proxy } from "valtio";

export type PointXY = {
    x: number;
    y: number;
};

type BuildState = {
    getPosProgress: {
        point: PointXY | null;
    };
};

export const buildState = proxy<BuildState>({
    getPosProgress: {
        point: null,
    },
});
