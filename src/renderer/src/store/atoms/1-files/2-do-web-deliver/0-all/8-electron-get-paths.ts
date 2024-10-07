/**
 * electron filenames with external call to main process
 */
export function electronGetPaths(files: File[]): string[] {
    const filenames = [...files]
        .map(
            (file) => {
                return tmApi.getPathForFile(file);
            }
        )
        .filter(Boolean);
    return filenames;
}
