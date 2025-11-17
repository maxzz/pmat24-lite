// v.08.10.25, v.11.15.25

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

/**
 * !! Used only to produce test names for debug only !!.
 * 
 * Returns the filename and extension from a path or filename. Hot handles propery all edge cases when name w/o path.
 * @param filename - The path or filename to extract the filename and extension from
 * @returns An array with the filename and extension
 */
export function getFilenameAndExt(filename: string): [string, string] {
    const parts = filename.replace(/[\\\/\s]+$/, '').split('.'); // not good if dot is the folder name and last part is the file name wo/ dot. remove last slashes and whitespaces
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
            .replace(/[\\\/\s]+$/, '')          // remove last slashes and whitespaces
            .replace(/^\//, '')                 // remove first slash
            .split(/[\\\/]/);                   // split by slashes
    rv.pop();                                   // remove filename as the last item
    return rv.join('/');
}

/**
 * Returns the filename from path or last folder name
 */
export function filenameWithoutPath(path: string | undefined): string {
    const rv =
        (path || '')
            .replace(/[\\\/\s]+$/, '')          // remove last slashes and whitespaces
            .replace(/^[\\\/]+/, '')            // remove first slashes
            .split(/[\\\/]/);                   // split by slashes
    return rv.pop() || '';
}

/**
 * Removes the last slash and whitespaces from a filename or path.
 * QA provided path '\\10.40.36.91\logins\' and it should be 'logins' instead of '\' after call.
 * @param filename - The filename or path to remove the last slash and whitespaces from
 * @returns The filename or path without the last slash and whitespaces
 */
export function replaceLastSlash(filename: string | undefined): string {
    return (filename || '').replace(/[\\\/\s]+$/, '');  // remove last slashes and whitespaces
}

// -----------------------------

//TODO: https://github.com/sindresorhus/unused-filename for `file.txt` → `file (1).txt`
