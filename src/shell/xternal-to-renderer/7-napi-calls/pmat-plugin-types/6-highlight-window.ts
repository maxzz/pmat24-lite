import { type PluginDataCallback, type TargetClientRect } from "./9-types";
import { type HighlightError } from "./6-highlight-control";

// Highlight desktop app window control

export type WindowHighlighterParams = {
    hwnd: string;                   // Window handle. Not used currently, but saved in case it may be needed in the future.
    rect: TargetClientRect;         // Used to highlight desktop app window
    highlightColor?: string;        // Color of the highlighted border, RGB string in normal HTML form #AABBCC. Default: #FF0000. Do not send #000000 or #008080.
    width?: number                  // Width of the highlighted border in pixels. Default: 5
};

export type WindowHighlighterResult = HighlightError | undefined | ''; // If empty string, then opetation is started and will be finished later

export interface WindowHighlighter {
    new(): WindowHighlighter;
    highlight(windowHighlighterParams: string, cb: PluginDataCallback<WindowHighlighterResult>): void;
    unHighlight(dummy: string, cb: PluginDataCallback<WindowHighlighterResult>): void;
}
