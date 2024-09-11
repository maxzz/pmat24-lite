import { addon } from "./0-addon";
import { type WindowControlHighlighterParams, type WindowControlHighlighter, type TargetClientRect } from "./pmat-plugin-types";

let gWindowControlHighlighter: WindowControlHighlighter | null = null;

export function highlightRect(hwnd: string, rect: TargetClientRect): void {
    if (!gWindowControlHighlighter) {
        gWindowControlHighlighter = new addon.WindowControlHighlighter();
    }

    if (!gWindowControlHighlighter) {
        throw new Error('no gWindowControlHighlighter');
    }

    const params: WindowControlHighlighterParams = { hwnd, rect };
    const param = JSON.stringify(params);

    gWindowControlHighlighter.highlight(param);
}
