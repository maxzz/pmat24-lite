import { type FileWithDirectoryAndFileHandle } from "browser-fs-access";
import { pathWithoutFilename } from "@/utils";

// Legacy by filenames

export function findShortestPathInFnames(filenames: string[]): string {
    if (!filenames.length) {
        return '';
    }

    let shortestPath = filenames[0];

    for (const filename of filenames) {
        const currentPath = filename;
        if (currentPath.length < shortestPath.length) {
            shortestPath = currentPath;
        }
    }

    return shortestPath;
}

export function fnamesToPaths(filenames: string[]): string[] {
    return filenames.map((filename) => pathWithoutFilename(filename));
}

// Modern with FileWithDirectoryAndFileHandle

type FindShortestPathModernResult = {               // This is part of RootDir wo/ fromMain knowledge
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
    hadle: FileSystemDirectoryHandle | undefined;   // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
};

export function findShortestPathModern(files: FileWithDirectoryAndFileHandle[]): FindShortestPathModernResult | undefined {
    if (!files.length) {
        return;
    }

    let shortest: string = pathWithoutFilename(files[0]?.webkitRelativePath);
    let handle: FileWithDirectoryAndFileHandle = files[0];

    for (let i = 1; i < files.length; i++) {
        const item = files[i];
        const curr = pathWithoutFilename(item?.webkitRelativePath); //TODO: it should be full path not just name, so we should use item.handle?.webkitRelativePath but is exists only for File

        if (!curr || !item.directoryHandle) {
            continue;
        }

        const isShoter = !shortest || curr.length < shortest.length;
        if (isShoter) {
            shortest = curr;
            handle = item;
        }
    }

    const rv: FindShortestPathModernResult = {
        hadle: handle.directoryHandle,
        rpath: shortest,
    };
    return rv;
}
