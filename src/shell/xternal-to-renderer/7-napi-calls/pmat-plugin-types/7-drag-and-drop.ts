import { type PluginDataCallback, type TargetClientRect, type PluginErrorCallback } from "./9-types";

// Drag And Drop icon to a window (for programmatic mouse click to a control in manual mode)

export type DragAndDropParams = {
    hwnd: string;
};

export type PointXY = {                 // x and y coordinates relative to client area of the window
    x: number;
    y: number;
};

export type TargetPosition = {
    point: PointXY;                           // Current mouse coordinates converted to the client area of target window.
    clientRect?: TargetClientRect;            // Client rect of the target window, in client coordinates (i.e. top-left is 0,0)
    windowRect?: TargetClientRect;            // Window rect of the target window, in client coordinates of the target window (i.e. top is negative)
};

export type DragAndDropResult = {
    status: 'progress';        // TODO: status 'done' never returns
} & TargetPosition;

export interface DragAndDropper {
    new(): DragAndDropper;
    init(dragAndDropParams: string, cb: PluginErrorCallback): void;
    move(params: string, cb: PluginDataCallback<DragAndDropper>): void;
    stop(params: string, cb: PluginErrorCallback): void;
}
