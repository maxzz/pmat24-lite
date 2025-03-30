export type FilePathAndDir = [file: File, path: string, isDirectory: boolean];

/**
 * electron filenames with external call to main process
 */
export function electronGetPaths(files: File[]): readonly FilePathAndDir[] {
    const rv = [...files]
        .map<FilePathAndDir>(
            (file) => {
                const res = tmApi.getPathForFile(file);
                return [file, res.filePath, res.isDirectory];
            }
        )
        .filter((item) => !!item[1]);
    return rv;
}
