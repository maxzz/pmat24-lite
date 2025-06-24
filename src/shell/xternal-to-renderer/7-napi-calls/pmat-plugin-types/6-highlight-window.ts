import { type PluginDataCallback, type Rect4 } from "./9-types";
import { type HighlightError } from "./6-highlight-control";

// Highlight target window

/**
 * Should be defined rect or hwnd. If rect is defined it will be used to highlight target window in screen coordinates.
 * If rect is not defined and hwnd defined then the window client area will be used and deflated by the border width.
 * If rect is not defined and hwnd is not defined then error will be returned (hwnd should be valid window handle).
 */
export type WindowHighlighterParams =
    | {
        rect: Rect4;                       // If rect is defined it will be used to highlight target window in screen coordinates.
    } & HighlighterOptions
    | {
        hwnd: string;                      // If rect is not defined and hwnd defined then the window client area will be used and deflated by the border width.
    } & HighlighterOptions;

export type HighlighterOptions = {
    highlightColor?: string;               // Color of the highlighted border, in HTML form #RRGGBB. Default: #FF0000. Do not send #000000 or #008080.
    width?: number;                        // Width of the highlighted border in pixels. Default: 5
};

export type WindowHighlighterResult = HighlightError | undefined | ''; // If empty string, then opetation is started and will be finished later

export interface WindowHighlighter {
    new(): WindowHighlighter;
    highlight(windowHighlighterParams: string, cb: PluginDataCallback<WindowHighlighterResult>): void;
    unHighlight(dummy: string, cb: PluginDataCallback<WindowHighlighterResult>): void;
}

/*
    GAI: 'How to get Windows 11 window rectangle? GetWindowRect returns the wrong rectangle the is somehow inflated. Why?'

        Obtaining an accurate window rectangle in Windows 11:

            * You are correct that GetWindowRect can return an inflated rectangle in Windows 11 and later versions.
              This is because GetWindowRect may include invisible resize borders in its calculation, especially when DPI virtualization is involved.

            * To get the visible window bounds (excluding these borders), you should use DwmGetWindowAttribute with the DWMWA_EXTENDED_FRAME_BOUNDS flag.

            * Drop shadow: While DwmGetWindowAttribute with DWMWA_EXTENDED_FRAME_BOUNDS provides the visible window bounds, it does not include the area of the window's drop shadow.
              If you need the rectangle including the drop shadow, you would still use GetWindowRect.
                #include <dwmapi.h>
                // ... inside your code ...
                RECT rc;
                HRESULT hr = DwmGetWindowAttribute(hWnd, DWMWA_EXTENDED_FRAME_BOUNDS, &rc, sizeof(rc));
                if (SUCCEEDED(hr)) { /*rc now contains the visible window bounds*/ /* ... /* }
*/
