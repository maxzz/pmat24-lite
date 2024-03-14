import { basename, extname, join, normalize } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { FileContent } from '@shared/ipc-types';

function collectNamesRecursively(filenames: string[], rv: Partial<FileContent>[]) {
    (filenames || []).forEach((filename) => {
        filename = normalize(filename);
        try {
            const st = statSync(filename);

            if (st.isFile()) {
                rv.push({
                    fname: basename(filename),
                    fpath: filename,
                    fmodi: st.mtimeMs,
                    size: st.size,
                    main: true,
                });
            } else if (st.isDirectory()) {
                const entries = readdirSync(filename).map((entry) => join(filename, entry));
                collectNamesRecursively(entries, rv);
            }

        } catch (error) {
            rv.push({
                fname: basename(filename),
                fpath: filename,
                raw: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    });
}

function isOurExt(filename: string | undefined, allowedExt: string[]): boolean | undefined {
    const ext = extname(filename || '').replace('.', '').toLowerCase();
    return allowedExt.includes(ext);
}

export function loadFilesContent(filenames: string[], allowedExt?: string[]): FileContent[] {
    let files: Partial<FileContent>[] = [];
    collectNamesRecursively(filenames, files);

    if (allowedExt) {
        files = files.map(
            (fileContent) => (
                isOurExt(fileContent.fname, allowedExt)
                    ? fileContent
                    : { ...fileContent, notOur: true, failed: true }
            )
        );
    }

    files.forEach(
        (file, idx) => {
            if (!file.failed && !file.notOur) {
                try {
                    file.idx = idx;
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
