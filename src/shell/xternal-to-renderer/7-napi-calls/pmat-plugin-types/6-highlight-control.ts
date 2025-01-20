import { type TargetClientRect } from "./9-types";

// Highlight desktop app window control

export type WindowControlHighlighterParams = {
    hwnd: string;
    rect: TargetClientRect;
};

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

export interface WindowControlHighlighter {
    new(): WindowControlHighlighter;
    highlight(windowControlHighlighterParams: string): void;
}
