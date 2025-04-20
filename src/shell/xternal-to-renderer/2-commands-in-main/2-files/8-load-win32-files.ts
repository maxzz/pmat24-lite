import { basename, dirname, extname, join, normalize } from "node:path";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { type MainFileContent } from "@shared/ipc-types";

/**
 * @returns MainFileContent casted to FileContent. They should be filled from renderer.
 */
export function loadWin32FilesContent(filenames: string[], allowedExt?: string[]): { filesCnt: MainFileContent[]; emptyFolder: string; } {

    let rv: MainFileContent[] = [];
    collectNamesRecursively(filenames, rv);

    allowedExt && rv.forEach((item) => item.notOur = !isAllowedExt(item.fname, allowedExt));

    rv.forEach(
        (fileContent, idx) => { // read file content
            fileContent.idx = idx;
            if (fileContent.failed || fileContent.notOur) {
                return;
            }

            try {
                const fullName = join(fileContent.fpath!, fileContent.fname);
                fileContent.rawLoaded = readFileSync(fullName).toString();
            } catch (error) {
                fileContent.rawLoaded = error instanceof Error ? error.message : JSON.stringify(error);
                fileContent.failed = true;
            }
        }
    );

    let emptyFolder = '';

    if (!rv.length && filenames.length === 1) {
        try {
            if (statSync(filenames[0]).isDirectory()) {
                emptyFolder = filenames[0];
            }
        } catch (error) {
            console.error(error); // this should be folder and will not happen
        }
    }

    return { filesCnt: rv, emptyFolder };
}

function collectNamesRecursively(filenames: string[], rv: MainFileContent[]) {
    (filenames || []).forEach(
        (filename) => {
            filename = normalize(filename);

            const newItem: MainFileContent = {
                idx: 0,
                fname: basename(filename),
                fpath: dirname(filename),
                fmodi: 0,
                size: 0,
                rawLoaded: '',
                rawCpass: undefined,
                failed: false,
                notOur: false,
                newFile: false,
                newAsManual: false,
                fromMain: true,
                webFsItem: null,
            };

            try {
                const st = statSync(filename);

                if (st.isFile()) {
                    newItem.fmodi = st.mtimeMs;
                    newItem.size = st.size;
                    rv.push(newItem);
                }
                else if (st.isDirectory()) {
                    const entries = readdirSync(filename).map((entry) => join(filename, entry));
                    collectNamesRecursively(entries, rv);
                }
            } catch (error) {
                newItem.rawLoaded = error instanceof Error ? error.message : JSON.stringify(error);
                newItem.failed = true;
                rv.push(newItem);
            }
        }
    );
}

function isAllowedExt(filename: string | undefined, allowedExt: string[]): boolean | undefined { // the same as in renderer
    const ext = extname(filename || '').replace('.', '').toLowerCase();
    return allowedExt.includes(ext);
}
