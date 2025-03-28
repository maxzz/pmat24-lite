/**
 * Verify that the user has granted permission to read and write to the file.
 * @param handle - The file or directory handle to verify.
 * @param readWrite - Whether to check for read and write permissions.
 * @returns - A promise that resolves to true if the user has granted permission, or false otherwise.
 */
/*TODO: export*/ export async function asyncVerifyPermission({ handle, readWrite }: { handle: FileSystemHandle; readWrite: boolean; }): Promise<boolean> {
    const options: FileSystemHandlePermissionDescriptor = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }

    // Check if permission was already granted. If so, return true.
    if ((await handle.queryPermission(options)) === 'granted') {
        return true;
    }

    // Request permission. If the user grants permission, return true.
    if ((await handle.requestPermission(options)) === 'granted') {
        return true;
    }

    // The user didn't grant permission, so return false.
    return false;
}
