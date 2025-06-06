import { addon } from "./0-addon";
import { type WindowControlHighlighterParams, type WindowControlHighlighter } from "./pmat-plugin-types";

let gWindowControlHighlighter: WindowControlHighlighter | null = null;

export function highlightField(params: WindowControlHighlighterParams): Promise<string> {

    if (!gWindowControlHighlighter) {
        gWindowControlHighlighter = new addon.WindowControlHighlighter();
    }
    if (!gWindowControlHighlighter) {
        throw new Error('no gWindowControlHighlighter');
    }

    const paramStr = JSON.stringify(params);

    return new Promise<string>((resolve, reject) => {
        if (!gWindowControlHighlighter) {
            throw new Error('no gWindowControlHighlighter');
        }

        gWindowControlHighlighter.highlight(paramStr,
            (err: any, data: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
}
