import { basename, dirname, extname, join, normalize } from "node:path";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { type MainFileContent } from "@shared/ipc-types";
import { getLinkTargetPath } from "@shell/3-utils-main";

/**
 * @param filenames - filenames with path
 * It can be files and/or directories. A single directory or Windows shortcut link to a directory is also possible.
 * @param allowedExt - allowed extensions
 * @returns { filesCnt: MainFileContent[]; emptyFolder: string; } - 
 *  - filesCnt - MainFileContent casted to FileContent. They should be filled from renderer.
 *  - emptyFolder - if call open folder and no files found then we return empty folder path
 */
export async function asyncLoadWin32FilesContent(filenames: string[], allowedExt?: string[]): Promise<{ filesCnt: MainFileContent[]; emptyFolder: string; }> { // call 'r2mi:load-files' in main
    let isLink = false;

    if (filenames.length === 1) { // resolve shortcut link to target only if it's a single file from drag and drop
        const linkTarget = await getLinkTargetPath(filenames[0]);
        isLink = linkTarget !== filenames[0];
        filenames[0] = linkTarget;
    }

    const loaded: MainFileContent[] = await collectNames(filenames);
    readFilesCnt(loaded);

    let emptyFolder = '';

    if (!loaded.length && filenames.length === 1) {
        try {
            if (statSync(filenames[0]).isDirectory()) {
                emptyFolder = filenames[0];
            }
        } catch (error) {
            console.error(error); // this should be folder and will not happen
        }
    }

    return { filesCnt: loaded, emptyFolder };
}

// Collect files and folders recursively

type CollectCtx = {
    numberOfLevels: number; // number of levels to collect: 1 - only root as allowedSubfolders, 2 - root and subfolders of 1st level and allowedSubfolders
    allowedSubfolders: string[]; // allowed subfolders to collect at level 0
    rv: MainFileContent[];
};

async function collectNames(filenames: string[], allowedExt?: string[]): Promise<MainFileContent[]> {
    const ctx: CollectCtx = { numberOfLevels: 1, allowedSubfolders: ["a", "b", "c"], rv: [] };
    await collectNamesRecursively(filenames, 0, ctx);

    allowedExt && ctx.rv.forEach((item) => item.notOur = !isAllowedExt(item.fname, allowedExt));
    return ctx.rv;
}

async function collectNamesRecursively(filenames: string[], level: number, ctx: CollectCtx) {
    for (const fname of (filenames || [])) {
        const filename = normalize(fname);

        const newItem: MainFileContent = makeNewItem(filename);
        try {
            const st = statSync(filename);

            if (st.isFile()) {
                newItem.fmodi = st.mtimeMs;
                newItem.size = st.size;
                ctx.rv.push(newItem);
            }
            else if (st.isDirectory()) {
                const handleThisDir = level === ctx.numberOfLevels - 1 || ctx.allowedSubfolders.includes(basename(filename));
                if (handleThisDir) {
                    const entries = readdirSync(filename).map(
                        (entry) => join(filename, entry)
                    );
                    await collectNamesRecursively(entries, level + 1, ctx);
                }
            }
        } catch (error) {
            newItem.rawLoaded = error instanceof Error ? error.message : JSON.stringify(error);
            newItem.failed = true;
            ctx.rv.push(newItem);
        }
    }
}

function makeNewItem(filename: string): MainFileContent {
    return {
        idx: 0,
        fname: basename(filename),
        fpath: dirname(filename),
        fmodi: 0,
        size: 0,
        rawLoaded: '',
        failed: false,
        notOur: false,
        newFile: false,
        newAsManual: false,
        fromMain: true,
        webFsItem: null,
    };
}

function isAllowedExt(filename: string | undefined, allowedExt: string[]): boolean | undefined { // the same as in renderer
    const ext = extname(filename || '').replace('.', '').toLowerCase();
    return allowedExt.includes(ext);
}

// Read files content

function readFilesCnt(filesCnt: MainFileContent[]): void {
    filesCnt.forEach(
        (fileContent, idx) => {
            fileContent.idx = idx;
            if (fileContent.failed || fileContent.notOur) {
                return;
            }
            // read file content if not failed and our
            try {
                const fullName = join(fileContent.fpath!, fileContent.fname);
                fileContent.rawLoaded = readFileSync(fullName).toString();
            } catch (error) {
                fileContent.rawLoaded = error instanceof Error ? error.message : JSON.stringify(error);
                fileContent.failed = true;
            }
        }
    );
}
