import { type FileMani, type Mani } from "@/store/8-manifest";

// Print utilities

/**
 * Print shorten xml for debugging.
 */
export function print_XmlManiFile(xml: string | undefined, { label, labelCss = '', bodyCss = '', bodyCollapsed = false }: { label: string, labelCss?: string, bodyCss?: string; bodyCollapsed?: boolean; }) {
    let text = replaceInXml_NamesExt(xml || '""');
    text = eatXmlNewLines(text);

    if (bodyCollapsed) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${text}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, text);
    }
}

function replaceInXml_NamesExt(xml: string | undefined) {
    return (xml || '').replace(/names_ext="[^"]+"/g, 'names_ext="..."');
}

function eatXmlNewLines(xml: string | undefined) {
    let rv = (xml || '').replace(/\s*(displayname="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(type="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(dbname="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(path_ext="[^"]+")/g, ' $1');
    return rv;
}

/**
 * Print shorten manifest for debugging without destructing the original manifest.
 */
export function print_TestManifest(newMani: Partial<Mani.Manifest> | FileMani.Manifest, { label, labelCss = '', bodyCss = '', bodyCollapsed = false, dropEmptyvalues }: { label: string, labelCss?: string, bodyCss?: string; bodyCollapsed?: boolean; dropEmptyvalues?: boolean; }) {
    const rv = { ...newMani };
    if (rv.forms?.[0]?.detection.names_ext) {
        rv.forms[0] = { ...rv.forms[0] };
        rv.forms[0].detection = { ...rv.forms[0].detection };
        rv.forms[0].detection.names_ext = "...";
    }
    if (rv.forms?.[1]?.detection.names_ext) {
        rv.forms[1] = { ...rv.forms[1] };
        rv.forms[1].detection = { ...rv.forms[1].detection };
        rv.forms[1].detection.names_ext = "...";
    }

    // Print new mani as modified JSON.

    let text = JSON.stringify(rv, null, 2);
    if (dropEmptyvalues) {
        text = eatJsonEmptyValues(text);
    }

    if (bodyCollapsed) {
        console.groupCollapsed(`%c${label}`, labelCss);
        console.log(`%c${text}`, bodyCss);
        console.groupEnd();
    } else {
        console.log(`%c${label}%c%s`, labelCss, bodyCss, text);
    }
}

function eatJsonEmptyValues(json: string | undefined) {
    let rv = (json || '');
    rv = rv.replace(/\s*"[^"]+": "",?/g, '');
    return rv;
}

/**
 * @param newMani Print new mani as unmodified JSON.
 */
// function print_NewMani(newMani: string) {
//     console.log(`%cNew mani:\n${newMani}`, "color:dimgray");
// }
