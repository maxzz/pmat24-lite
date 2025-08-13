import { type TestInUseFile } from "@shared/ipc-types/9-test-inuse";
import { getCacheFolder, listFiles } from "./8-os-utils";

export async function testInUseStart(files: TestInUseFile[]): Promise<string> {

    for (const file of files) {
        if (file.inTest) {
            console.log(`\nTest in use: file "${file.fullfname}" is in test mode.`);
        } else {
            console.log(`\nTest in use: file "${file.fullfname}" is not in test mode.`);
        }
    }

    return Promise.resolve(files.map(file => file.fullfname).join('\n'));
}

export async function testInUseUpdate(files: TestInUseFile[]): Promise<string> {

    for (const file of files) {
        if (file.inTest) {
            console.log(`\nTest in use: file "${file.fullfname}" is in test mode.`);
        } else {
            console.log(`\nTest in use: file "${file.fullfname}" is not in test mode.`);
        }
    }

    return Promise.resolve(files.map(file => file.fullfname).join('\n'));
}

export async function testInUseQuit(): Promise<string> {

    // get folder 'c' location enum all files in it and delete them

    const cacheFolder = getCacheFolder();

    const files = await listFiles(cacheFolder);

    //TODO: we can remove cache folder itself

    return Promise.resolve('');
}
