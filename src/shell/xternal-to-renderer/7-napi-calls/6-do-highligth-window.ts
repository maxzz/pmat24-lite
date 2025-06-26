import { addon } from "./0-addon";
import { type WindowHighlighterParams, type WindowHighlighter, type OkIfEmptyString } from "./pmat-plugin-types";

let highlighter: WindowHighlighter | null = null;

export function highlightWindow(params: WindowHighlighterParams | undefined): Promise<OkIfEmptyString> { // call 'r2mi:highlight-target' in main
    if (!highlighter) {
        highlighter = new addon.WindowHighlighter();
        if (!highlighter) {
            throw new Error('no.gh');
        }
    }

    const showOrHide = !!params;
    const paramsStr = showOrHide ? JSON.stringify(params) : '';
    const methodName = showOrHide ? 'highlight' : 'unHighlight';

    return new Promise<string>((resolve, reject) => {
        highlighter![methodName](paramsStr,
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
