import { basename, extname, join, normalize } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { FileContent } from '@shared/ipc-types';

type MainFileContent = Omit<FileContent, 'id' | 'entry' | 'file'>;

function collectNamesRecursively(filenames: string[], rv: MainFileContent[]) {
    (filenames || []).forEach((filename) => {
        filename = normalize(filename);

        const newItem: MainFileContent = {
            idx: 0,
            fname: basename(filename),
            fpath: filename,
            fmodi: 0,
            size: 0,
            raw: '',
            fromMain: true,
            failed: false,
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
    });
}

function isOurExt(filename: string | undefined, allowedExt: string[]): boolean | undefined {
    const ext = extname(filename || '').replace('.', '').toLowerCase();
    return allowedExt.includes(ext);
}

export function loadFilesContent(filenames: string[], allowedExt?: string[]): FileContent[] {
    let files: MainFileContent[] = [];
    collectNamesRecursively(filenames, files);

    allowedExt && files.forEach((item) => item.notOur = !isOurExt(item.fname, allowedExt));

    files.forEach(
        (file, idx) => {
            file.idx = idx;
            if (!file.failed && !file.notOur) {
                try {
                    file.raw = readFileSync(file.fpath!).toString();
                } catch (error) {
                    file.raw = error instanceof Error ? error.message : JSON.stringify(error);
                    file.failed = true;
                }
            }
        }
    );

    return files as Required<FileContent>[];
}
