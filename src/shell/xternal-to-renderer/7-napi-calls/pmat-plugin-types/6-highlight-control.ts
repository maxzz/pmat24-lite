import { type BrowserExtErrors } from "./4-get-manifest";
import { type PluginDataCallback, type TargetClientRect } from "./9-types";

// Highlight desktop app window control

export type WindowControlHighlighterParams = {
    hwnd: string;                // Window handle. We get process name from this window handle to decide whether it is a browser or a desktop app.
    rect?: TargetClientRect;     // Used to highlight controls in desktop apps
    accId?: number;              // Used to highlight controls in browsers
};

//TODO: highlight() show have result: with ok, or error like 'window not found', 'window is minimized', 'no open browser', and so on

/**
 * Class for getting window icon. Instantiate once and call getIcon multiple times.
 *
 * During instantiation it internally starts GDI Plus. So, do not create/destruct this class multiple times,
 * it will be expensive.

 * Usage:
 * let highlighter = new WindowControlHighlighter();
 * highlighter.highlight('{"hwnd":"12345", "rect":{"left":100,"right":200,"top":100,"bottom":200}}');
 *
 * TODO: There is no hide highlighter call. Is that done by timer? How to set timer interval in that case or reset show to see rect again?
 */

export type Win32Errors =
    | 'no.hwnd'                    // No hwnd found
    | 'internal';                  // Internal error

export type HighlightError = {
    type: 'error';
    error: BrowserExtErrors | Win32Errors;
    hr?: number                    // Optional HRESULT for the error
    message?: string               // Optional error message
};

export type WindowControlHighlighterResult = HighlightError;


export interface WindowControlHighlighter {
    new(): WindowControlHighlighter;
    highlight(windowControlHighlighterParams: string, cb: PluginDataCallback<WindowControlHighlighterResult>): void;
}
