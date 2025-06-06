export type FilePathAndDir = [
    file: File,
    path: string,
    isDirectory: boolean,
];

/**
 * electron filenames with external call to main process. Names without path skipped.
 * @param files - files to get paths for
 * @returns array of tuples [file, path, isDirectory]
 */
export function electronGetPaths(files: File[]): readonly FilePathAndDir[] {
    const rv = [...files]
        .map<FilePathAndDir>(
            (file) => {
                const { filePath, isDirectory } = tmApi.getPathForFile(file);
                return [file, filePath, isDirectory];
            }
        )
        .filter((item: FilePathAndDir) => !!item[1]);
    return rv;
}
