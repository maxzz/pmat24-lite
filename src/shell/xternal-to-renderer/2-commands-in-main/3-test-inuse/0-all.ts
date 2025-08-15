import { promises as fs } from "fs";
import { type TestInUseParams_Start, type TestInUseParams_Set, type TestInUseResultItem } from "@shared/ipc-types/9-test-inuse";
import { type R2MInvoke } from "@shared/ipc-types";
import { deleteFolder, getCacheFolder, getCacheInTestFolder, listFiles } from "./8-os-utils";
import { errorToString } from "@shell/3-utils-main";
import { performCommand } from "../../7-napi-calls";

export async function testInUseInMain_Start(files: TestInUseParams_Start[]): Promise<string> { // 'r2mi:test-in-use-start'
    const rv: (TestInUseResultItem | undefined)[] = [];

    for await (const file of files) {
        const res = await setFileTestInUse(file, true, false);
        res && rv.push(res);
    }

    return rv.length ? JSON.stringify(rv) : '';
}

export async function testInUseInMain_Set(files: TestInUseParams_Set[]): Promise<string> { // 'r2mi:test-in-use-set'
    const rv: (TestInUseResultItem | undefined)[] = [];

    for await (const file of files) {
        const res = await setFileTestInUse(file, file.inTest, file.deleteFile);
        res && rv.push(res);
    }

    return rv.length ? JSON.stringify(rv) : '';
}

async function setFileTestInUse(file: TestInUseParams_Start, inTest: boolean, deleteFile: boolean): Promise<TestInUseResultItem | undefined> {
    const cacheFolder = getCacheInTestFolder();
    const fullName = `${cacheFolder}/${file.shortfname}`;

    try {
        if (deleteFile) {
            await fs.rm(fullName, { force: true });
            return;
        }

        if (inTest) {
            if (!file.rawCnt) {
                throw new Error(`\nTestInUse: "${file.shortfname}" wo/ content`);
            }

            await fs.mkdir(cacheFolder, { recursive: true });
            await fs.writeFile(fullName, file.rawCnt, 'utf8'); // Overwrites by default
        } else {
            const stats = await fs.stat(fullName);
            if (stats.isFile()) {
                await fs.rm(fullName, { force: true });
            }
        }
    } catch (err) {
        return {
            unid: file.unid,
            error: `Cannot set "${fullName}" in test mode(=${inTest}). Error is: "${errorToString(err)}"`,
        };
    }
}

export async function testInUseInMain_Quit(): Promise<R2MInvoke.EmptyOkOrError> { // 'r2mi:test-in-use-quit'
    const cacheFolder = getCacheFolder();
    const rv = await deleteFolder(cacheFolder) || '';
    return rv;
}

export async function testInUseInMain_QuitWithReload(): Promise<R2MInvoke.EmptyOkOrError> { // 'r2mi:test-in-use-quit-with-reload'
    const cacheFolder = getCacheFolder();
    const rv = await deleteFolder(cacheFolder) || '';
    await performCommand({ command: 'reloadCache' });
    return rv;
}
