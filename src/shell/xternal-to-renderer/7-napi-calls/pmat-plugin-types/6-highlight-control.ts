import { type Win32Errors, type BrowserExtErrors, type PluginDataCallback, type Rect4 } from "./9-types";

// Highlight desktop app window control

export type WindowControlHighlighterParams = {
    hwnd: string;                   // Window handle. We get process name from this window handle to decide whether it is a browser or a desktop app.
    rect?: Rect4;                   // Used to highlight controls in desktop apps
    accId?: number;                 // Used to highlight controls in browsers
};

export type HighlightError = {
    type: 'error';
    error: BrowserExtErrors | Win32Errors; // 'window not found', 'window is minimized', 'no open browser', and so on
    hr?: number;                    // Optional HRESULT for the error
    message?: string;               // Optional error message
};

export type WindowControlHighlighterResult = HighlightError | undefined | ''; // If empty string, then opetation is started and will be finished later

/**
 * Class for getting window icon. Instantiate once and call getIcon multiple times. During instantiation it
 * internally starts GDI Plus. So, do not create/destruct this class multiple times, it will be expensive.
 * Usage:
 * ```
 *      let highlighter = new WindowControlHighlighter();
 *      highlighter.highlight('{"hwnd":"12345", "rect":{"left":100,"right":200,"top":100,"bottom":200}}');
 * ```
 * TBD: There is no hide highlighter call. Is that done by timer. How to set timer interval in that case or reset show to see rect again?
 */
export interface WindowControlHighlighter {
    new(): WindowControlHighlighter;
    highlight(windowControlHighlighterParams: string, cb: PluginDataCallback<WindowControlHighlighterResult>): void;
}
