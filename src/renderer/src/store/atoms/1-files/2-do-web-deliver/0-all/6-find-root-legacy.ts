import { type FileWithDirectoryAndFileHandle } from "browser-fs-access";
import { type RootDir } from "./7-root-dir";
import { pathWithoutFilename } from "@/utils";

export function findShortestPathLegacy(files: FileWithDirectoryAndFileHandle[]): RootDir | undefined {
    if (!files.length) {
        return;
    }

    let shortest: string = pathWithoutFilename(files[0]?.webkitRelativePath);
    let theBest: FileWithDirectoryAndFileHandle = files[0];

    for (let i = 1; i < files.length; i++) {
        const item = files[i];
        const curr = pathWithoutFilename(item?.webkitRelativePath); //TODO: it should be full path not just name, so we should use item.handle?.webkitRelativePath but is exists only for File

        if (!curr || !item.directoryHandle) {
            continue;
        }

        const isShoter = !shortest || curr.length < shortest.length;
        if (isShoter) {
            shortest = curr;
            theBest = item;
        }
    }

    const rv: RootDir = {
        dir: theBest.directoryHandle,
        rpath: shortest,
        fromMain: false,
    };
    return rv;
}
