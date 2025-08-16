import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type TestInUseParams_Start, type TestInUseParams_Set, type TestInUseResultItem } from "@shared/ipc-types/9-test-inuse";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { getInTestInUse } from "@/store/0-serve-atoms/5-do-inuse-test";
import { asyncReloadCache } from "../b-do-perform-command";

export async function inTest_Start(fileUsAtoms: FileUsAtom[], getset: GetSet) {
    if (!hasMain()) {
        return;
    }

    const files: TestInUseParams_Start[] = [];

    fileUsAtoms.forEach(
        (fileUsAtom) => {
            const fileUs = getset.get(fileUsAtom);
            const { inTest } = getInTestInUse(fileUs.fileCnt.fpath);
            if (inTest) {
                const inUseFile: TestInUseParams_Start = {
                    shortfname: fileUs.fileCnt.fname,
                    unid: fileUs.fileCnt.unid,
                    rawCnt: fileUs.fileCnt.rawLoaded,
                };
                files.push(inUseFile);
            }
        }
    );

    if (!files.length) {
        return;
    }

    const res = await invokeMainTyped({ type: 'r2mi:test-in-use-start', files });
    if (res) {
        console.error('inTest_Start', res);
    }

    await asyncReloadCache();
}

export async function inTest_Set({ fileUs, inTest, deleteFile }: { fileUs: FileUs; inTest: boolean; deleteFile: boolean; }) {
    if (!hasMain()) {
        return;
    }

    const inUseFile: TestInUseParams_Set = {
        shortfname: fileUs.fileCnt.fname,
        unid: fileUs.fileCnt.unid,
        rawCnt: fileUs.fileCnt.rawLoaded,
        inTest,
        deleteFile,
    };

    const res = await invokeMainTyped({ type: 'r2mi:test-in-use-set', files: [inUseFile] });
    if (res) {
        console.error('inTest_Set', res);
    }

    await asyncReloadCache();
}

export async function inTest_Quit() {
    if (!hasMain()) {
        return;
    }

    const res = await invokeMainTyped({ type: 'r2mi:test-in-use-quit' });
    if (res) {
        console.error('inTest_Quit', res);
    }

    await asyncReloadCache();
}

//TODO: handle result errors
