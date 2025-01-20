import { type PluginDataCallback, type TargetClientRect } from "./9-types";

// Drag And Drop icon to a window (for programmatic mouse click to a control in manual mode)

export type DragAndDropParams = {
    hwnd: string;
};

export type PointXY = {                 // x and y coordinates relative to client area of the window
    x: number;
    y: number;
};

export type TargetPosition = {
    point: PointXY;
    rect?: TargetClientRect;            // TODO: why c++ returns clientRect?
};

export type DragAndDropResult = {
    status: 'progress' | 'done';        // TODO: status 'done' never returns
} & TargetPosition;

export interface dragAndDrop {
    (DragAndDropParams: string, cb: PluginDataCallback): void;
}
