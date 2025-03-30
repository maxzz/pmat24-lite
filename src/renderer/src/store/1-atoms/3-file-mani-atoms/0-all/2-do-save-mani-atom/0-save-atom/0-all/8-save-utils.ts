import { type FileMani, type Mani } from "@/store/manifest";

export function filterEmptyValues<T extends Record<string, any>>(obj: T): T | undefined {
    const entries = Object
        .entries(obj)
        .filter(([key, value]) => !!value);
        
    return entries.length ? Object.fromEntries(entries) as T : undefined;
}

export function printTestManifest(newMani: Partial<Mani.Manifest> | FileMani.Manifest) {

    if (newMani.forms?.[0]?.detection.names_ext) {
        newMani.forms[0].detection.names_ext = "...";
    }
    if (newMani.forms?.[1]?.detection.names_ext) {
        newMani.forms[1].detection.names_ext = "...";
    }

    console.log('%cnew manifest\n', 'color: magenta', JSON.stringify(newMani, null, 2));
}

export function replaceNamesExt(xml: string) {
    return xml.replace(/names_ext="[^"]+"/g, 'names_ext="..."');
}

export function printXmlManiFile(xml: string) {
    console.log('%c🚀 ~ xml:\n', 'color: magenta', replaceNamesExt(xml));
}
