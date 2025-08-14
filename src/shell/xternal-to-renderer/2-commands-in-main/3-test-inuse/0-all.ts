import { promises as fs } from "fs";
import { type TestInUseParams_Start, type TestInUseParams_Set, type TestInUseResultItem } from "@shared/ipc-types/9-test-inuse";
import { type R2MInvoke } from "@shared/ipc-types";
import { deleteFolder, getCacheFolder, getCacheInTestFolder, listFiles } from "./8-os-utils";
import { errorToString } from "@shell/3-utils-main";

export async function testInUseInMain_Start(files: TestInUseParams_Start[]): Promise<string> {
    const rv: (TestInUseResultItem | undefined)[] = [];

    for await (const file of files) {
        //TODO: save to cache

        const res = await setFileTestInUse(file, true);
        rv.push(res);

        //console.log(`\nTestInUse: cannot put "${file.shortfname}" in test mode`);
    }

    return JSON.stringify(rv);
    // return Promise.resolve(files.map(file => file.shortfname).join('\n'));
}

export async function testInUseInMain_Set(files: TestInUseParams_Set[]): Promise<string> {
    const rv: (TestInUseResultItem | undefined)[] = [];

    for await (const file of files) {
        const res = await setFileTestInUse(file, file.inTest);
        rv.push(res);
    }

    return JSON.stringify(rv);
    //return Promise.resolve(files.map(file => file.shortfname).join('\n'));
}

async function setFileTestInUse(file: TestInUseParams_Start, inTest: boolean): Promise<TestInUseResultItem | undefined> {
    try {
        const cacheFolder = getCacheInTestFolder();
        const fullName = `${cacheFolder}/${file.shortfname}`;

        if (inTest) {
            if (!file.rawCnt) {
                throw new Error(`\nTestInUse: "${file.shortfname}" wo/ content`);
            }

            await fs.mkdir(cacheFolder, { recursive: true });
            await fs.writeFile(fullName, file.rawCnt, 'utf8'); // Overwrites by default
        } else {
            const stats = await fs.stat(file.shortfname);
            if (stats.isFile()) {
                await fs.rm(`${cacheFolder}/${file.shortfname}`, { force: true });
            }
        }
    } catch (err) {
        return {
            unid: file.unid,
            error: `Cannot set "${file.shortfname}" in test mode(=${inTest}). Error is: "${errorToString(err)}"`,
        };
    }
}

export async function testInUseInMain_Quit(): Promise<R2MInvoke.EmptyOkOrError> {
    const cacheFolder = getCacheFolder();
    const rv = await deleteFolder(cacheFolder) || '';
    return rv;
}
