export type PrintCollapsedText = {
    label: string;
    labelCss?: string;
    bodyCss?: string;
    expandBody?: boolean;
};

export function print_CollapsedText(body: string, { label, labelCss = '', bodyCss = '', expandBody }: PrintCollapsedText) {
    if (!expandBody) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${body}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, body);
    }
}

export function eatFieldsJsonNewLines(xml: string | undefined) {
    let rv = (xml || '').replace(/\s*("displayname": "[^"]+",?)/g, ' $1');
    rv = rv.replace(/\s*("type": "[^"]+",?)/g, ' $1');
    rv = rv.replace(/\s*("dbname": "[^"]+",?)/g, ' $1');
    rv = rv.replace(/\s*("useit": (true|false),?)/g, ' $1');
    rv = rv.replace(/\s*("password": (true|false),?)/g, ' $1');
    rv = rv.replace(/\s*("submit": (dosubmit|nosubmit|true|false),?)/g, ' $1');

    rv = rv.replace(/\s*("rfield": (?:"[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("rfieldform": (?:"[^"]+"|-?\d+),?)/g, ' $1');

    rv = rv.replace(/\s*("formIdx": (?:"[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("uuidThis": ("[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("uuidLoginFld": ("[^"]+"|\d+),?)/g, ' $1');
    rv = rv.replace(/\s*("dbnameInitial": "[^"]+",?)/g, ' $1');

    return rv;
}
