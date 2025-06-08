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

    console.log('%cin.main:highlightField in', 'color: magenta', params);

    const paramStr = JSON.stringify(params);

    return new Promise<string>((resolve, reject) => {
        if (!gHighlighter) {
            reject('no.gh');
        }

        gHighlighter?.highlight(paramStr,
            (err: any, _data: string) => {

                console.log('%cin.main:highlightField result', 'color: magenta', err, _data);

                if (err) {
                    console.log('%cin.main:highlightField cb err', 'color: magenta', err, _data);
                    resolve(err);
                } else {
                    console.log('%cin.main:highlightField cb data', 'color: magenta', err, _data);
                    resolve('');
                }
            }
        );
    });
}
