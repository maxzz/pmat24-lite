import { type PluginDataCallback, type Rect4, type PluginErrorCallback, type PointXY } from "./9-types";

// Drag And Drop icon to a window (for manual mode runtime: mouse click to set position for the next script action).

export type DragAndDropParams = {
    hwnd: string;
};

export type DragAndDropResult = {
    status: 'initialized' | 'progress' | 'done' | 'abandoned';
    point: PointXY;                     // Current mouse coordinates converted to the client area of target window.
    clientRect?: Rect4;                 // Client rect of the target window, in client coordinates (i.e. top-left is 0,0)
    windowRect?: Rect4;                 // Window rect of the target window, in client coordinates of the target window (i.e. top is negative)
};

export type TargetPosition = Omit<DragAndDropResult, 'status'>;

// export interface DragAndDropper {
//     new(): DragAndDropper;
//     init(dragAndDropParams: string, cb: PluginErrorCallback): void;
//     move(params: string, cb: PluginDataCallback<DragAndDropResult>): void;
//     stop(params: string, cb: PluginErrorCallback): void;
// }

export interface DragAndDropper {
    new(): DragAndDropper;
    init(dragAndDropParams: string, cb: PluginDataCallback<DragAndDropResult>): void; // This will subscribe to track move events and show target icon at cursor position
    move(params: ''): void; // This will trigger move event for track method
    stop(params: ''): void; // This will unsubscribe from move events
}
