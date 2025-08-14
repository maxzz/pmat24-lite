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

export function filenameForRegex(filename: string | undefined): string {
    return (filename || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
