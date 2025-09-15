// slashes back and forward

export function toUnix(fileName: string | undefined): string {
    let rv: string =
        (fileName || '')
            .replace(/\\/g, '/')
            .replace(/(?!^)\/\//g, "/"); // replace double slashes with single slashes except at the start of the string (network share)
    return rv;
}

export function toWindows(fileName: string | undefined): string {
    let rv: string =
        (fileName || '')
            .replace(/\//g, '/')
            .replace(/\//g, '\\');
    return rv;
}

//

export function normalizeFpath(fpath: string | undefined): string {
    return toUnix(fpath).toLowerCase();
}

export function filenameForRegex(filename: string | undefined): string {
    return (filename || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
