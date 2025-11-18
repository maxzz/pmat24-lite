import { type FilePathAndDir, electronGetPaths, getRootFromFpath, invokeLoadFiles } from "@/xternal-to-main";
import { type FileContent, pmAllowedToOpenExt } from "@shared/ipc-types";
import { type SetDeliveredFiles } from "../../1-do-set-files";
import { printElectronFnameFiles } from "./9-types";

/**
 * Create FileContent items from open file/directory legacy web dialog or legacy drag and drop operation
 * Modern drag and drop and dialog operations are not supported due to electronGetPaths() limitations.
 * It should be File object not modified by JS.
 */
export async function createFileContents_From_Main(files: File[]): Promise<SetDeliveredFiles | undefined> {
    const filePathAndDirs: readonly FilePathAndDir[] = electronGetPaths(files);
    if (!filePathAndDirs.length) {
        return;
    }

    const fnames = filePathAndDirs.map((item) => item[1]);
    //printElectronFnameFiles(fnames, files);

    const { filesCnt: deliveredFileContents, emptyFolder, error } = await invokeLoadFiles(fnames, pmAllowedToOpenExt);

    const droppedEmptyFolder = !deliveredFileContents.length
        && (filePathAndDirs.length === 1 && filePathAndDirs[0][2] // filePathAndDirs[0][2] is true file is a directory
            || !!emptyFolder
        );

    const rv: SetDeliveredFiles = {
        root:
            !droppedEmptyFolder
                ? getRootFromFpath({ files: deliveredFileContents, fromMain: true })
                : {
                    fpath: emptyFolder, //was filePathAndDirs[0][1],
                    handle: undefined,
                    fromMain: true,
                },
        deliveredFileContents,
        noItemsJustDir: droppedEmptyFolder,
        error,
    };
    return rv;
}

//TODO: review change emptyFolder vs. filePathAndDirs[0][1]
