import { addon } from "./0-addon";
import { type WindowControlHighlighterParams, type WindowControlHighlighter, type OkIfEmptyString } from "./pmat-plugin-types";

let highlighter: WindowControlHighlighter | null = null;

export function highlightControl(params: WindowControlHighlighterParams | undefined): Promise<OkIfEmptyString> { // call 'r2mi:highlight-field' in main
    if (!highlighter) {
        highlighter = new addon.WindowControlHighlighter();
        if (!highlighter) {
            throw new Error('no.gh');
        }
    }

    const showOrHide = !!params;
    const paramsStr = showOrHide ? JSON.stringify(params) : '';
    const methodName = showOrHide ? 'highlight' : 'hide';

    return new Promise<string>((resolve, reject) => {
        highlighter![methodName](paramsStr,
            (err: any, data?: string) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve('');
                }
            }
        );
    });
}
