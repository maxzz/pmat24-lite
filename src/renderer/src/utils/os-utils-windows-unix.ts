// slashes back and forward

export function toUnix(fileName: string | undefined): string {

    const double = /\/\//;
    let res: string = (fileName || '')//.replace(/\\/g, '/');
    
    res = res.replace(/(?!^)\\\\\\\\/g, "/");

    // while (res.match(double)) {
    //     res = res.replace(double, '/');
    // }
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

function test() {
    let a: string = '';
    let b: string = '';
    let c: string = '';
    a = 'c:/y/w/2-web/0-dp/pmat24-lite/src/renderer/src/store/5-1-files/4-mru-dirs.ts';
    b = toUnix(a);
    c = toWindows(b);
    console.log(`a: ${a}`);
    console.log(`   b: ${b}`);
    console.log(`   c: ${c}`);

    a = '\\\\TANAM5\\share-to-hid\\pmat-network-test\\test-files\\test.txt';
    b = toUnix(a);
    c = toWindows(b);
    console.log(`a: ${a}`);
    console.log(`   b: ${b}`);
    console.log(`   c: ${c}`);
}
test();