// v.08.10.25

export function returnFileSize(number: number): string {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) { // 1024 < n < 1024 * 1024
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576 && number < 1073741824) { // 1024 * 1024 < n < 1024 * 1024 * 1024
        return (number / 1048576).toFixed(1) + 'MB';
    } else {
        return (number / 1073741824).toFixed(1) + 'GB';
    }
}

// -----------------------------
// extensions

// function fileExt(filename: string): string {
//     const ss = filename.split('.');
//     return ss.length > 1 ? ss[ss.length - 1] : '';          // a.b -> b; a.b/c -> 'b/c'
// }

export function extensionWoDot(filename: string): string {
    return /(?:\.([^./\\]+))?$/.exec(filename)?.[1] || '';  // a.b -> b; a.b/c -> ''
}

export function isAllowedExt(filename: string | undefined, allowedExt: string[]): boolean | undefined {
    const ext = extensionWoDot(filename || '').replace('.', '').toLowerCase();
    return allowedExt.includes(ext);
}

// function replaceExt(filename: string, newExt: string): string {
//     return filename.replace(/\.[^/.]+$/, newExt); // replace last extension; ("name.ext", ".com") -> 'name.com'; ("name", ".com") -> 'name'
// }

// function fileExt(filename: string): string {
//     return filename.split('.').pop() || '';
// }

// function removeExt(filename: string): string {
//     return filename.replace(/\.[^/.]+$/, ''); // replace last extension; ("name.ext") -> 'name'; ("name") -> 'name'
// }

export function getFilenameAndExt(filename: string): [string, string] {
    const parts = filename.split('.'); // not good if dot is the folder name and last part is the file name wo/ dot.
    const ext = parts.pop() || '';
    const name = parts.join('.');
    return [name, ext];
}

// -----------------------------
// web delivered files

/**
 * Returns path from WebFileSysItem.path without the filename
 */
export function pathWithoutFilename(path: string | undefined): string {
    const rv =
        (path || '')
            .replace(/^\//, '') // remove first slash
            .split(/[\\\/]/);   // split by slashes
    rv.pop(); // remove filename as the last item
    return rv.join('/');
}

/**
 * Returns the filename from path or last folder name
 */
export function filenameWithoutPath(path: string | undefined): string {
    const rv =
        (path || '')
            .replace(/^\//, '') // remove first slash
            .split(/[\\\/]/);   // split by slashes
    return rv.pop() || '';
}

// -----------------------------
// slashes back and forward

export function toUnix(fileName: string | undefined): string {
    const double = /\/\//;
    let res: string = (fileName || '').replace(/\\/g, '/');
    while (res.match(double)) {
        res = res.replace(double, '/');
    }
    return res;
}

export function toWindows(fileName: string | undefined): string {
    let res: string = (fileName || '').replace(/\//g, '/');
    res = res.replace(/\//g, '\\');
    return res;
}

export function normalizeFpath(fpath: string | undefined): string {
    return toUnix(fpath).toLowerCase();
}

// -----------------------------

//TODO: https://github.com/sindresorhus/unused-filename for `file.txt` → `file (1).txt`
