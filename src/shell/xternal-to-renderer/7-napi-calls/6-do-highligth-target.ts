import { addon } from "./0-addon";
import { type WindowHighlighterParams, type WindowHighlighter, OkIfEmptyString } from "./pmat-plugin-types";

let highlighter: WindowHighlighter | null = null;

export function highlightTargetWindow(params: WindowHighlighterParams | undefined): Promise<OkIfEmptyString> {
    if (!highlighter) {
        highlighter = new addon.WindowHighlighter();
        if (!highlighter) {
            throw new Error('no.gh');
        }
    }

    const showOrHide = !!params;

    if (showOrHide) {
        const paramStr = JSON.stringify(params);
        return new Promise<string>((resolve, reject) => {
            highlighter!.highlight(paramStr,
                (err: any, _data: string) => {
                    if (err) {
                        resolve(err);
                    } else {
                        resolve('');
                    }
                }
            );
        });
    } else {
        return new Promise<string>((resolve, reject) => {
            highlighter!.unHighlight('',
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
}
