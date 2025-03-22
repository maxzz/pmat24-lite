export type FileAndPath = [file: File, path: string];

/**
 * electron filenames with external call to main process
 */
export function electronGetPaths(files: File[]): readonly FileAndPath[] {
    const rv = [...files]
        .map<FileAndPath>(
            (file) => [file, tmApi.getPathForFile(file)]
        )
        .filter((item) => !!item[1]);
    return rv;
}
