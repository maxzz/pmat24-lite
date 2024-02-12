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

// function fileExt(filename: string): string {
//     const ss = filename.split('.');
//     return ss.length > 1 ? ss[ss.length - 1] : '';          // a.b -> b; a.b/c -> 'b/c'
// }

export function ext(filename: string): string {
    return /(?:\.([^./\\]+))?$/.exec(filename)?.[1] || '';  // a.b -> b; a.b/c -> ''
}
