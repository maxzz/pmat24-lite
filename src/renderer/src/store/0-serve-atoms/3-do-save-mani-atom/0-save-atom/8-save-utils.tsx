import { appSettings } from "@/store/9-ui-state";
import { getFilenameAndExt } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { type FileUs } from "@/store/store-types";
import { type FileMani, type Mani } from "@/store/8-manifest";

export function notice_SaveError(fname: string, errorText: string): void {
    notice.error(
        (<>
            <div>
                Cannot save file ${fname}.
            </div>
            <div className="mt-4 text-[.6rem]">
                {`${errorText}`}
            </div>
        </>
        ), { duration: 5000 }
    );
}

export function notice_NewSaved(fileUs: FileUs): void {
    if (appSettings.appUi.uiGeneral.notifyNewFile) {
        notice.info(`A new template has been created.`);
    }
    //console.log('Created', fileUs.fileCnt.fname);
}

/**
 * Generate debug only filename
 */
export function makeDebugTestFilename(fileName: string): string {
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
export function print_XmlManiFile(xml: string | undefined, {label, labelCss = '', bodyCss = ''}: {label: string, labelCss?: string, bodyCss?: string;}) {
    let text = replaceInXml_NamesExt(xml || '""');
    text = eatNewLines(text);
    console.log(
        `%c${label}%c%s`,
        labelCss,
        bodyCss,
        text
    );
}

function replaceInXml_NamesExt(xml: string | undefined) {
    return (xml || '').replace(/names_ext="[^"]+"/g, 'names_ext="..."');
}

function eatNewLines(xml: string | undefined) {
    let rv = (xml || '').replace(/\s*(displayname="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(type="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(dbname="[^"]+")/g, ' $1');
    rv = rv.replace(/\s*(path_ext="[^"]+")/g, ' $1');
    return rv;
}

/**
 * Print shorten manifest for debugging without destructing the original manifest.
 */
export function print_TestManifest(newMani: Partial<Mani.Manifest> | FileMani.Manifest) {
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
