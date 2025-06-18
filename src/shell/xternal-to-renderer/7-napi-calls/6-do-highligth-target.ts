import { addon } from "./0-addon";
import { type WindowHighlighterParams, type WindowHighlighter } from "./pmat-plugin-types";

let gHighlighter: WindowHighlighter | null = null;

export function highlightTargetWindow(params: WindowHighlighterParams | undefined): Promise<string> {
    if (!gHighlighter) {
        gHighlighter = new addon.WindowHighlighter();
        if (!gHighlighter) {
            throw new Error('no.gh');
        }
    }

    const showOrHide = !!params;

    if (showOrHide) {
        const paramStr = JSON.stringify(params);
        return new Promise<string>((resolve, reject) => {
            if (!gHighlighter) {
                reject('no.hi');
                return;
            }

            gHighlighter.highlight(paramStr,
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
            if (!gHighlighter) {
                reject('no.hi');
                return;
            }

            gHighlighter.unHighlight('',
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
