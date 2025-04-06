import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app";
import { type FileMani, type Mani } from "@/store/manifest";
import { getFilenameAndExt } from "@/utils";

/**
 * Filter empty values from the object at the top level.
 * If the object is empty, return undefined.
 */
export function filterEmptyValues<T extends Record<string, any>>(obj: T): T | undefined {
    const entries = Object
        .entries(obj)
        .filter(([key, value]) => !!value);

    return entries.length ? Object.fromEntries(entries) as T : undefined;
}

/**
 * Print shorten manifest for debugging.
 */
export function printTestManifest(newMani: Partial<Mani.Manifest> | FileMani.Manifest) {

    if (newMani.forms?.[0]?.detection.names_ext) {
        newMani.forms[0].detection.names_ext = "...";
    }
    if (newMani.forms?.[1]?.detection.names_ext) {
        newMani.forms[1].detection.names_ext = "...";
    }

    console.log('%cnew manifest\n', 'color: magenta', JSON.stringify(newMani, null, 2));
}

/**
 * Print shorten xml for debugging.
 */
export function printXmlManiFile(xml: string) {
    console.log('%c🚀 ~ xml:\n', 'color: magenta', replaceInXml_NamesExt(xml));
}

function replaceInXml_NamesExt(xml: string) {
    return xml.replace(/names_ext="[^"]+"/g, 'names_ext="..."');
}

/**
 * Generate debug only filename
 * @param fileName 
 * @returns 
 */
export function debugTestFilename(fileName: string) {
    if (!appSettings.appUi.uiAdvanced.saveWDebugExt) {
        return fileName;
    }
    const [name, ext] = getFilenameAndExt(fileName);
    return `${name}.test.${ext}`;
}

/**
 * Check if file with the given name exists in the parent directory.
 * There is no check for subfolders, i.e. only direct children of the parent directory.
 */
export async function isFilenameExists(parent: FileSystemDirectoryHandle | null | undefined, filename: string): Promise<boolean> {
    if (!parent) {
        console.error('no parent directory');
        return false;
    }

    try {
        const fileHandle = await parent.getFileHandle(filename, { create: false });
        if (fileHandle) {
            return true;
        }
    } catch (error) {
        console.error('isFilenameExists', error);
    }

    return false;
}
