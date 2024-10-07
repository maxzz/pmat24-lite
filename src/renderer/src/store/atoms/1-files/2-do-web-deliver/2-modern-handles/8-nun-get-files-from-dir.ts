/*
MDN: https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle
async function* getFilesRecursively(entry) {
    if (entry.kind === "file") {
        const file = await entry.getFile();
        if (file !== null) {
            file.relativePath = getRelativePath(entry);
            yield file;
        }
    } else if (entry.kind === "directory") {
        for await (const handle of entry.values()) {
            yield* getFilesRecursively(handle);
        }
    }
}

for await (const fileHandle of getFilesRecursively(directoryHandle)) {
    console.log(fileHandle);
}
*/

export type IFile = File & {
    relativePath?: string[] | null;
};

export async function getFilesFromDir(directoryHandle: FileSystemDirectoryHandle): Promise<IFile[]> {

    async function* getFilesRecursively(entry: FileSystemDirectoryHandle | FileSystemFileHandle) {
        if (entry.kind === 'file') {
            const file: IFile = await entry.getFile();
            if (file) {
                file.relativePath = await directoryHandle.resolve(entry);
                yield file;
            }
        }
        else if (entry.kind === 'directory') {
            for await (const handle of entry.values()) {
                yield* getFilesRecursively(handle as FileSystemDirectoryHandle | FileSystemFileHandle);
            }
        }
    }

    let rv: IFile[] = [];
    for await (const fileHandle of getFilesRecursively(directoryHandle)) {
        rv.push(fileHandle);
    }

    return rv;
}
