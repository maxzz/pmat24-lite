import { promises as fs } from "fs";

// names

export function getCacheFolder(): string {
    const { LOCALAPPDATA } = process.env;
    if (!LOCALAPPDATA) {
        throw new Error('LOCALAPPDATA is not set');
    }
    return `${LOCALAPPDATA}/digitalpersona/ots/dp_wkg_admin`;
}

export function getCacheInTestFolder(): string {
    return `${getCacheFolder()}/c`;
}

// list files

export async function listFiles(cacheFolder: string): Promise<string[]> {
    const rv: string[] = [];

    try {
        const files = await fs.readdir(cacheFolder); // Returns an array of filenames

        for (const file of files) {
            const fullname = `${cacheFolder}/${file}`;
            const stats = await fs.stat(fullname);
            if (stats.isFile()) {
                rv.push(fullname);
            }
        }

    } catch (err) {
        console.error(`Error reading directory: "${cacheFolder}"`, err);
    }

    return rv;
}

// delete folder

export async function deleteFolder(cacheFolder: string): Promise<void> {
    try {
        await fs.rm(cacheFolder, { recursive: true, force: true });
    } catch (err) {
        console.error(`Error deleting folder: "${cacheFolder}"`, err);
    }
}
