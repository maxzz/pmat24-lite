import { addon } from "./0-addon";
import { type WindowHighlighterParams, type WindowHighlighter, type OkIfEmptyString } from "./pmat-plugin-types";

let highlighter: WindowHighlighter | null = null;

export function highlightTargetWindow(params: WindowHighlighterParams | undefined): Promise<OkIfEmptyString> {
    if (!highlighter) {
        highlighter = new addon.WindowHighlighter();
        if (!highlighter) {
            throw new Error('no.gh');
        }
    }

    const showOrHide = !!params;
    const paramStr = showOrHide ? JSON.stringify(params) : '';
    const methodName = showOrHide ? 'highlight' : 'unHighlight';

    return new Promise<string>((resolve, reject) => {
        highlighter![methodName](paramStr,
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
