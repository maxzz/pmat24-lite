import { appSettings } from "@/store/1-atoms/9-ui-state";
import { getFilenameAndExt } from "@/utils";
import { toast } from "sonner";
import { type FileUs } from "@/store/store-types";
import { type FileMani, type Mani } from "@/store/manifest";

export function notificationSaveError(fname: string, errorText: string) {
    toast.error((<>
        <div>
            Cannot save file ${fname}.
        </div>
        <div className="mt-4 text-[.6rem]">
            {`${errorText}`}
        </div>
    </>), { duration: 5000 }
    );
}

export function notificationNewSaved(fileUs: FileUs) {
    if (appSettings.appUi.uiGeneral.notifyNewFile) {
        toast.info(`File "${fileUs.fileCnt.fname}" saved`);
    }
    console.log('saved', fileUs.fileCnt.fname);
}

/**
 * Generate debug only filename
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

// Print utilities

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
