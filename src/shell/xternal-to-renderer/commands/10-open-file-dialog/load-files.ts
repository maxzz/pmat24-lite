import { basename, dirname, extname, join, normalize } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { type FileContent } from '@shared/ipc-types';

type MainFileContent = Omit<FileContent, 'unid'>;

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
                raw: '',
                fromMain: true,
                failed: false,
                webFsItem: null,
            };

            try {
                const st = statSync(filename);

                if (st.isFile()) {
                    newItem.fmodi = st.mtimeMs;
                    newItem.size = st.size;
                    rv.push(newItem);
                } else if (st.isDirectory()) {
                    const entries = readdirSync(filename).map((entry) => join(filename, entry));
                    collectNamesRecursively(entries, rv);
                }
            } catch (error) {
                newItem.raw = error instanceof Error ? error.message : JSON.stringify(error);
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

export function loadWin32FilesContent(filenames: string[], allowedExt?: string[]): FileContent[] {
    
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
                fileContent.raw = readFileSync(fullName).toString();
            } catch (error) {
                fileContent.raw = error instanceof Error ? error.message : JSON.stringify(error);
                fileContent.failed = true;
            }
        }
    );

    return rv as FileContent[];
}
