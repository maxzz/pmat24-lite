import { type FileContent } from "@shared/ipc-types";

/**
 * There should be only one field_catalog.dpn per folder.
 * The first file.dpn in the folder takes precedence if there is no field catalog.dpn.
 */
export function filterFcDuplicates(deliveredFileContents: FileContent[]): FileContent[] {
    const rv: FileContent[] = [];

    const seen = new Map<string, FileContent>();

    for (const item of deliveredFileContents) {

        const {fpath, fname} = item;

        const isDpnExt = fname.endsWith('.dpn');
        if (!isDpnExt) {
            rv.push(item);
            continue;
        }

        //console.log(`filterFcDuplicates "${fpath}" fname: "${fname}"`);

        const prevItem = seen.get(fpath);
        if (!prevItem) {
            seen.set(fpath, item);
            continue;
        }

        const isLegalName = fname.toLowerCase() === 'field_catalog.dpn';
        if (isLegalName) {
            seen.set(fpath, item);
        }
    }

    for (const item of seen.values()) {
        rv.push(item);
    }

    return rv;
}
