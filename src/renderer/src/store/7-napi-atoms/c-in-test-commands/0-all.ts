import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type TestInUseParams_Start, type TestInUseParams_Set, type TestInUseResultItem } from "@shared/ipc-types/9-test-inuse";
import { invokeMainTyped } from "@/xternal-to-main";
import { getInTestInUse } from "@/store/1-atoms/0-serve-atoms/5-do-inuse-test";

export async function inTest_Start(file: FileUsAtom[], getset: GetSet) {
    const files: TestInUseParams_Start[] = [];
    file.forEach(
        (fileUsAtom) => {
            const fileUs = getset.get(fileUsAtom);
            const inTest = getInTestInUse(fileUs.fileCnt.fpath);
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

    const res = await invokeMainTyped({ type: 'r2mi:test-in-use-start', files });
    if (res) {
        console.error('inTest_Start', res);
    }
}

export async function inTest_Set(fileUs: FileUs, inTest: boolean) {
    const inUseFile: TestInUseParams_Set = {
        shortfname: fileUs.fileCnt.fname,
        unid: fileUs.fileCnt.unid,
        rawCnt: fileUs.fileCnt.rawLoaded,
        inTest,
    };

    const res = await invokeMainTyped({ type: 'r2mi:test-in-use-set', files: [inUseFile] });
    if (res) {
        console.error('inTest_Set', res);
    }
}

export async function inTest_Quit() {
    const res = await invokeMainTyped({ type: 'r2mi:test-in-use-quit' });
    if (res) {
        console.error('inTest_Quit', res);
    }
}
