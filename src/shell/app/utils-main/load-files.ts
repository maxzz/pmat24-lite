import { basename, extname, join, normalize } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { FileContent } from '@shared/ipc-types';

function collect(filenames: string[], rv: Partial<FileContent>[]) {
    (filenames || []).forEach((filename) => {
        filename = normalize(filename);
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                rv.push({
                    name: basename(filename),
                    fullPath: filename,
                });
            } else if (st.isDirectory()) {
                const entries = readdirSync(filename).map((entry) => join(filename, entry));
                collect(entries, rv);
            }
        } catch (error) {
            rv.push({
                name: basename(filename),
                fullPath: filename,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    });
}

export function loadFilesContent(filenames: string[], allowedExt?: string[]): FileContent[] {
    let files: Partial<FileContent>[] = [];
    collect(filenames, files);

    files = allowedExt
        ? files.map((file) => allowedExt.includes(extname(file.name || '').replace('.', '').toLowerCase())
            ? file
            : { ...file, notOur: true, failed: true })
        : files;

    files.forEach((file) => {
        if (!file.failed && !file.notOur) {
            try {
                file.cnt = readFileSync(file.fullPath!).toString();
            } catch (error) {
                file.cnt = error instanceof Error ? error.message : JSON.stringify(error);
                file.failed = true;
            }
        }
    });

    return files as Required<FileContent>[];
}
