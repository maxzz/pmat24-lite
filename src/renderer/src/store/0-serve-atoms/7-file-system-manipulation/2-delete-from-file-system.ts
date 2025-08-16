import { errorToString } from "@/utils";
import { hasMain, invokeMainTyped } from "@/xternal-to-main";
import { type FileUs } from "@/store/store-types";
import { rootDir } from "@/store/1-files-atom";

export async function deleteFileFromFileSystem(fileUs: FileUs): Promise<string | undefined> {
    if (fileUs.fileCnt.newFile) { // new file is not saved to file system yet
        return undefined;
    }
    try {
        if (hasMain()) {
            const fullName = `${fileUs.fileCnt.fpath}/${fileUs.fileCnt.fname}`;
            const res = await invokeMainTyped({ type: 'r2mi:delete-file', fileName: fullName });
            if (res) {
                console.error('Delete error', res);
            }
        } else {
            if (!rootDir.handle) {
                console.error('No rootDir.handle');
                return;
            }
            await rootDir.handle.removeEntry(fileUs.fileCnt.fname);
        }
    } catch (error) {
        console.error('Delete error', error);
        return errorToString(error);
    }
}
