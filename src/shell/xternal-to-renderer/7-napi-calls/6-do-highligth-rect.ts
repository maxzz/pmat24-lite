import { addon } from "./0-addon";
import { type WindowControlHighlighterParams, type WindowControlHighlighter, type OkIfEmptyString } from "./pmat-plugin-types";

let highlighter: WindowControlHighlighter | null = null;

export function highlightField(params: WindowControlHighlighterParams): Promise<OkIfEmptyString> {
    if (!highlighter) {
        highlighter = new addon.WindowControlHighlighter();
        if (!highlighter) {
            throw new Error('no.gh');
        }
    }

    const paramsStr = JSON.stringify(params);

    return new Promise<string>((resolve, reject) => {
        highlighter!.highlight(paramsStr,
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
