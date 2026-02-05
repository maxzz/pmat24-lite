import { type FileMani, type Mani } from "@/store/8-manifest";
import { type PrintCollapsedText, print_CollapsedText } from "./8-print-utils";

/**
 * Print shorten xml for debugging.
 */
export function print_XmlManiFile(xml: string | undefined, styles: PrintCollapsedText) {
    let text = replaceInXml_NamesExt(xml || '""');
    text = eatXmlNewLines(text);

    print_CollapsedText(text, styles);
}

function replaceInXml_NamesExt(xml: string | undefined) {
    return (xml || '').replace(/names_ext="[^"]+"/g, 'names_ext="..."');
}

function eatXmlNewLines(xml: string | undefined) {
    let rv = (xml || '');

    // descriptor
    rv = rv.replace(/\s*(id="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(created="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(modified="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(version="[^"]+")/g, ' $1');

    // field
    rv = rv.replace(/\s*(displayname="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(type="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(dbname="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(path_ext="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(\/\>)/g, ' $1');
    return rv;
}

/**
 * Print shorten manifest for debugging without destructing the original manifest.
 */
export function print_TestManifest(newMani: Partial<Mani.Manifest> | FileMani.Manifest, { dropEmptyvalues, ...styles }: PrintCollapsedText & { dropEmptyvalues?: boolean; }) {

    // Copy manifest to avoid destructing the original
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

    print_CollapsedText(text, styles);
}

function eatJsonEmptyValues(json: string | undefined) {
    let rv = (json || '');
    rv = rv.replace(/\s*"[^"]+": "",?/g, '');
    return rv;
}
