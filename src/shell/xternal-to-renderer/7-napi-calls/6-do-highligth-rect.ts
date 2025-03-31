import { addon } from "./0-addon";
import { type WindowControlHighlighterParams, type WindowControlHighlighter, type TargetClientRect } from "./pmat-plugin-types";

let gWindowControlHighlighter: WindowControlHighlighter | null = null;

export function highlightField(params: WindowControlHighlighterParams): void {

    if (!gWindowControlHighlighter) {
        gWindowControlHighlighter = new addon.WindowControlHighlighter();
    }
    if (!gWindowControlHighlighter) {
        throw new Error('no gWindowControlHighlighter');
    }

    const paramStr = JSON.stringify(params);

    gWindowControlHighlighter.highlight(paramStr);
}
