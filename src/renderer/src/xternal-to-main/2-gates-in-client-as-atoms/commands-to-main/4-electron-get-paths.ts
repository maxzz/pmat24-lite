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
export async function electronGetPaths(files: File[]): Promise<readonly FilePathAndDir[]> {
    const results = await Promise.all(
        files.map(async (file) => {
            const { filePath, isDirectory } = await tmApi.getPathForFile(file);
            return [file, filePath, isDirectory] as FilePathAndDir;
        })
    );
    return results.filter((item: FilePathAndDir) => !!item[1]);
}
