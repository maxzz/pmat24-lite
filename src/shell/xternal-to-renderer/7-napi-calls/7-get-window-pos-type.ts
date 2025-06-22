import { type PointXY } from "./pmat-plugin-types";

// Call to client

export type PosTrackerCbType = Prettify<
    & PointXY                 // Current mouse coordinates converted to the client area of target window.
    & {
        isInside: boolean;    // Is mouse inside the target window
    }
>;
