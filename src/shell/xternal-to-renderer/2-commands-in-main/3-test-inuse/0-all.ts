import { promises as fs } from "fs";
import { type TestInUseFile, type TestInUseResultItem } from "@shared/ipc-types/9-test-inuse";
import { type R2MInvoke } from "@shared/ipc-types";
import { deleteFolder, getCacheFolder, getCacheInTestFolder, listFiles } from "./8-os-utils";
import { errorToString } from "@shell/3-utils-main";

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

    for await (const file of files) {
        await setFileTestInUse(file);
    }

    return Promise.resolve(files.map(file => file.fullfname).join('\n'));
}

async function setFileTestInUse(file: TestInUseFile): Promise<TestInUseResultItem | undefined> {
    try {
        const cacheFolder = getCacheInTestFolder();
        const fullName = `${cacheFolder}/${file.fullfname}`;

        if (file.inTest) {
            if (!file.rawCnt) {
                throw new Error(`\nTest in use: file "${file.fullfname}" is in test mode but rawCnt is not set.`);
            }
            await fs.mkdir(cacheFolder, { recursive: true });
            await fs.writeFile(fullName, file.rawCnt, 'utf8'); // Overwrites by default

            //throw new Error(`\nTest in use: file "${file.fullfname}" is in test mode but saving failed.`);

        } else {
            const stats = await fs.stat(file.fullfname);
            if (stats.isFile()) {
                await fs.rm(`${cacheFolder}/${file.fullfname}`, { force: true });
            }
        }
    } catch (err) {
        return {
            unid: file.unid,
            error: `Error setting file "${file.fullfname}" in test mode. Error is: "${errorToString(err)}"`,
        };
    }
}

export async function testInUseQuit(): Promise<R2MInvoke.EmptyOkOrError> {
    const cacheFolder = getCacheFolder();
    const rv = await deleteFolder(cacheFolder) || '';
    return rv;
}
