import { type PluginDataCallback, type Rect4, type PointXY, type OkIfEmptyString } from "./9-types";

// Drag And Drop icon to a window (for manual mode runtime: mouse click to set position for the next script action).

export type DragAndDropParams = {
    hwnd: string;
};

export type DragAndDropResult =
    | {
        status: 'initialized' | 'done' | 'abandoned';
    }
    | {
        status: 'progress';
    } & TargetPosition;

export type TargetPosition = {          // For Chrome browser client and window areas are the same
    point: PointXY;                     // Current mouse coordinates converted to the client area of target window.
    isInside: boolean;                  // Is mouse inside the target window
};

export interface DragAndDropper {
    new(): DragAndDropper;
    init(DragAndDropParams: string, cb: PluginDataCallback<DragAndDropResult>): OkIfEmptyString; // This will subscribe to track move events and show target icon at cursor position
    move(params: ''): void;             // This will trigger move event for track method
    stop(params: ''): void;             // This will unsubscribe from move events
}
