import { promises as fs } from "fs";
import { errorToString, normalizeFpath } from "@shell/3-utils-main";

// names

export function getCacheFolder(): string {
    const { LOCALAPPDATA } = process.env;
    if (!LOCALAPPDATA) {
        throw new Error('LOCALAPPDATA is not set');
    }
    return normalizeFpath(`${LOCALAPPDATA}/digitalpersona/ots/dp_wkg_admin`);
}

export function getCacheInTestFolder(): string {
    return `${getCacheFolder()}/c`;
}

// list files

export async function listFiles(cacheFolder: string): Promise<string[]> {
    const rv: string[] = [];

    try {
        const files = await fs.readdir(cacheFolder); // Returns an array of filenames

        for await (const file of files) {
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

export async function deleteFolder(cacheFolder: string): Promise<string | undefined> {
    try {
        const stats = await fs.stat(cacheFolder);
        if (stats.isDirectory()) {
            await fs.rm(cacheFolder, { recursive: true, force: true });
        }
    } catch (err) {
        if (typeof err === "object" && err !== null && "code" in err && (err as any).code === 'ENOENT') {
            return;
        }
        return `Error deleting folder: "${cacheFolder}" ${errorToString(err)}`;
    }
}
