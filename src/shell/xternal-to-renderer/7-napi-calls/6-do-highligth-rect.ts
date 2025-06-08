import { addon } from "./0-addon";
import { type WindowControlHighlighterParams, type WindowControlHighlighter } from "./pmat-plugin-types";

let gHighlighter: WindowControlHighlighter | null = null;

export function highlightField(params: WindowControlHighlighterParams): Promise<string> {
    if (!gHighlighter) {
        gHighlighter = new addon.WindowControlHighlighter();
        if (!gHighlighter) {
            throw new Error('no.gh');
        }
    }

    const paramStr = JSON.stringify(params);

    return new Promise<string>((resolve, reject) => {
        if (!gHighlighter) {
            reject('no.gh');
        }

        gHighlighter?.highlight(paramStr,
            (err: any, _data: string) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve('');
                }
            }
        );
    });
}
