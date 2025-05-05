import { appSettings } from "@/store/1-atoms/9-ui-state";
import { type FileMani, type Mani } from "@/store/manifest";
import { getFilenameAndExt } from "@/utils";

/**
 * Print shorten manifest for debugging without destructing the original manifest.
 */
export function printTestManifest(newMani: Partial<Mani.Manifest> | FileMani.Manifest) {

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

    console.log('%cnew manifest\n', 'color: magenta', JSON.stringify(rv, null, 2));
}

/**
 * Print shorten xml for debugging.
 */
export function printXmlManiFile(xml: string | undefined) {
    console.log('%c🚀 ~ xml:\n', 'color: magenta', replaceInXml_NamesExt(xml || '""'));
}

function replaceInXml_NamesExt(xml: string | undefined) {
    return (xml || '').replace(/names_ext="[^"]+"/g, 'names_ext="..."');
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
    if (name.endsWith('.test')) { // if allready there, just return
        return fileName;
    }
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
