import { promises as fs } from "fs";
import { type TestInUseParams_Start, type TestInUseParams_Set, type TestInUseResultItem } from "@shared/ipc-types/9-test-inuse";
import { type R2MInvoke } from "@shared/ipc-types";
import { deleteFolder, getCacheFolder, getCacheInTestFolder, listFiles } from "./8-os-utils";
import { errorToString } from "@shell/3-utils-main";

export async function testInUse_Start(files: TestInUseParams_Start[]): Promise<TestInUseResultItem | undefined> {

    for (const file of files) {
        console.log(`\nTest in use: file "${file.shortfname}" is in test mode.`);
    }

    return undefined;
    // return Promise.resolve(files.map(file => file.shortfname).join('\n'));
}

export async function testInUse_Update(files: TestInUseParams_Set[]): Promise<string> {
    const rv: (TestInUseResultItem | undefined)[] = [];

    for await (const file of files) {
        const res = await setFileTestInUse(file);
        rv.push(res);
    }

    return JSON.stringify(rv);
    //return Promise.resolve(files.map(file => file.shortfname).join('\n'));
}

async function setFileTestInUse(file: TestInUseParams_Set): Promise<TestInUseResultItem | undefined> {
    try {
        const cacheFolder = getCacheInTestFolder();
        const fullName = `${cacheFolder}/${file.shortfname}`;

        if (file.inTest) {
            if (!file.rawCnt) {
                throw new Error(`\nTest in use: file "${file.shortfname}" is in test mode but rawCnt is not set.`);
            }
            await fs.mkdir(cacheFolder, { recursive: true });
            await fs.writeFile(fullName, file.rawCnt, 'utf8'); // Overwrites by default

            //throw new Error(`\nTest in use: file "${file.shortfname}" is in test mode but saving failed.`);

        } else {
            const stats = await fs.stat(file.shortfname);
            if (stats.isFile()) {
                await fs.rm(`${cacheFolder}/${file.shortfname}`, { force: true });
            }
        }
    } catch (err) {
        return {
            unid: file.unid,
            error: `Error setting file "${file.shortfname}" in test mode. Error is: "${errorToString(err)}"`,
        };
    }
}

export async function testInUse_Quit(): Promise<R2MInvoke.EmptyOkOrError> {
    const cacheFolder = getCacheFolder();
    const rv = await deleteFolder(cacheFolder) || '';
    return rv;
}
